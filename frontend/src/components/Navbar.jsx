import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return <nav className=" flex w-full fixed justify-between items-center px-10 p-2 bg-black text-white">
    <div className="flex justify-between w-2/5">
      <h1 className="text-xl border-2 px-2 border-slate-200 rounded-xl font-bold">EmpManage</h1>
      <button className="text-xl font-bold hover:bg-slate-900 rounded-md px-1 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >Home</button>
      <button className="text-xl font-bold hover:bg-slate-900 rounded-md px-1 cursor-pointer"
        onClick={() => navigate("/employees")}
      >Employee List</button></div>
    <div className="flex space-x-2">
      <h1 className="text-xl font-bold">{localStorage.getItem("username")}</h1>
      <div className="flex hover:bg-slate-900"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/signin");
        }}
      >
        <button className="text-xl px-2 rounded-xl font-medium hover:" onClick={() => console.log("Publish")}>Logout</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 flex flex-col self-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
      </div>
    </div>
  </nav>
}

export default Navbar