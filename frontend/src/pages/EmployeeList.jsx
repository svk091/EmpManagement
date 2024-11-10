import { useEffect, useState } from "react"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeTable from "./EmployeeTable";
import axiosInstance from "../api/axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    const filtered = employees.filter((employee) => {
      const searchKeys = ["name", "email", "_id", "mobile"];
      return searchKeys.some((key) => employee[key].toLowerCase().includes(e.target.value.toLowerCase()));
    });
    setFilteredEmployees(filtered);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }

    const myPromise = axiosInstance({
      method: "get",
      url: "/api/employees",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    toast.promise(myPromise, {
      loading: 'Fetching...',
      success: (data) => {
        setEmployees(data.data);
        setIsLoading(false)
        return "Successfully fetched employees";
      },
      error: (e) => {
        if (e.response.status === 401) {
          navigate("/signin");
        }
        return e.response.data.error;
      },

    });
  }, [])

  return <div className="flex flex-col">
    <Navbar />
    <div className="mt-10 p-2">
      <h1 className="text-xl font-bold">Employee List</h1>

      <div className="flex justify-around mb-3">
        <p>Total Count: {isLoading ? "0" : +  employees.length}</p>
        <div className="flex space-x-1">
          <label className="text-xl font-bold tracking-wider">Search</label>
          <input className=" rounded-lg border-neutral-800 px-2  border-2" placeholder="Name, Email, Id, Date" type="type" value={searchTerm} onChange={onChangeHandler} />
        </div>
        <button className="border tracking-wid rounded-lg font-bold text-white px-3  shadow-xl bg-slate-900 focus:bg-slate-800 hover:bg-slate-800"
          onClick={() => {
            navigate("/create-employee")
          }}>
          Add Employee
        </button>
      </div>

      <div className="px-6">
        {
          isLoading ? <div>Loading...</div> :
            <EmployeeTable employees={filteredEmployees.length > 0 ? filteredEmployees : employees} />
        }
      </div>
    </div>
  </div>
}

export default EmployeeList