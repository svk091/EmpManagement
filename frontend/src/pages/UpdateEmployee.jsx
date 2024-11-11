import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Label from "../components/Label";
import Navbar from "../components/Navbar";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { employeeSchema } from "../lib/schema";
import axios from "axios";

const UpdateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    const myPromise = axios({
      method: "get",
      url: `https://empmanagement-i4jf.onrender.com/api/employees/employee/${params.id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    myPromise.then((response) => {
      const employeeData = response.data;
      setName(employeeData.name);
      setEmail(employeeData.email);
      setMobile(employeeData.mobile);
      setDesignation(employeeData.designation);
      setGender(employeeData.gender);
      setCourse(employeeData.course);
    })
  }, [params, navigate])

  const onClickHandler = () => {
    const employeeData = { name, email, mobile, designation, gender, course };

    const validation = employeeSchema.safeParse(employeeData);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors(formattedErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const myPromise = axios({
      method: "put",
      url: `https://empmanagement-i4jf.onrender.com/api/employees/${params.id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: employeeData
    });

    toast.promise(myPromise, {
      loading: 'Updating...',
      success: () => {
        navigate("/employees");
        return "Updated Employee";
      },
      error: (e) => {
        if (e.response.status === 401) {
          navigate("/signin");
        }
        return e.response.data.error;
      },
    });
  };

  return <div className="flex flex-col">
    <Navbar />
    <div className="mt-32 ml-96 flex flex-col border-2 w-2/4 p-4">
      <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <p className="text-red-500">{errors.name._errors[0]}</p>}

      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <p className="text-red-500">{errors.email._errors[0]}</p>}

      <InputField label="Mobile No" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      {errors.mobile && <p className="text-red-500">{errors.mobile._errors[0]}</p>}

      <Label label="Designation">
        <select className="p-2 w-full rounded-xl tracking-widest border-2 font-serif" value={designation} onChange={(e) => setDesignation(e.target.value)}>
          <option value="" disabled>Select Designation</option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales</option>
        </select>
      </Label>
      {errors.designation && <p className="text-red-500">{"Select Designation"}</p>}

      <Label label="Gender">
        <label className="font-serif" htmlFor="male">
          Male
          <input className="ml-4" type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} />
        </label>
        <label className="font-serif" htmlFor="female">
          Female
          <input className="ml-4" type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} />
        </label>
      </Label>
      {errors.gender && <p className="text-red-500">{"Select Gender"}</p>}

      <Label label="Course">
        <select className="p-2 w-full rounded-xl tracking-widest border-2 font-serif" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="" disabled>Select Course</option>
          <option value="mca">MCA</option>
          <option value="bca">BCA</option>
          <option value="bsc">BSC</option>
        </select>
      </Label>
      {errors.course && <p className="text-red-500">{"Select Course"}</p>}

      <div className="flex space-x-2">
        <Button label="Cancel" onClick={() => {
          navigate("/employees");
        }} />
        <Button label="Update Employee" onClick={onClickHandler} />
      </div>
    </div>
  </div>
};

export default UpdateEmployee;
