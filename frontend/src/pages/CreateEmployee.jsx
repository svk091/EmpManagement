import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Label from "../components/Label";
import Navbar from "../components/Navbar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { employeeSchema } from "../lib/schema";
import axios from "axios";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onClickHandler = () => {
    const employeeData = { name, email, mobile, designation, gender, course };

    const validation = employeeSchema.safeParse(employeeData);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors(formattedErrors);
      return
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }

    const myPromise = axios({
      method: "post",
      url: "https://empmanagement-i4jf.onrender.com/api/employees",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: employeeData
    });

    toast.promise(myPromise, {
      loading: 'Adding...',
      success: () => {
        navigate("/employees");
        return "Successfully Added employee";
      },
      error: (e) => {
        if (e.response.status === 401) {
          navigate("/signin");
        }
        return e.response.data.error;
      },
    });
  }


  return <div className="flex flex-col">
    <Navbar />
    <div className="mt-32 ml-96 flex flex-col border-2 w-2/4 p-4">

      <InputField label="Name" type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <p className="text-red-500">{errors.name._errors[0]}</p>}

      <InputField label="Email" type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <p className="text-red-500">{errors.email._errors[0]}</p>}

      <InputField label="Mobile No" type={"number"} value={mobile} onChange={(e) => setMobile(e.target.value)} />
      {errors.mobile && <p className="text-red-500">{errors.mobile._errors[0]}</p>}

      <Label label="Designation">
        <select className="p-2 w-full rounded-xl tracking-widest border-2 font-serif" defaultValue={""} name="designation" id="designation" onChange={(e) => setDesignation(e.target.value)}>
          <option value="" selected={designation === ""} />
          <option value="hr" selected={designation === "hr"} />
          <option value="manager" selected={designation === "manager"} />
          <option value="sales" selected={designation === "sales"} />
        </select>
      </Label>
      {errors.designation && <p className="text-red-500">{"Select Designation"}</p>}

      <Label label="Gender">
        <label className="font-serif" htmlFor="male">
          Male
          <input defaultChecked className="ml-4" type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} />
        </label>
        <label className="font-serif" htmlFor="female">
          Female
          <input className="ml-4" type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} />
        </label>
      </Label>
      {errors.gender && <p className="text-red-500">{"Select Gender"}</p>}

      <Label label="Course">
        <select className="p-2 w-full rounded-xl tracking-widest border-2 font-serif" name="course" id="course" onChange={(e) => setCourse(e.target.value)}>
          <option value="" selected={course === ""} />
          <option value="mca" selected={course === "mca"} />
          <option value="bca" selected={course === "bca"} />
          <option value="bsc" selected={course === "bsc"} />
        </select>
      </Label>
      {errors.course && <p className="text-red-500">{"Select Course"}</p>}

      <div className="flex space-x-2">
        <Button className={"bg-white hover:bg-slate-100 text-black border-black"} label="Cancel" onClick={() => {
          navigate("/employees");
        }} />
        <Button label="Add Employee" onClick={onClickHandler} />
      </div>
    </div>
  </div>
}

export default CreateEmployee;

