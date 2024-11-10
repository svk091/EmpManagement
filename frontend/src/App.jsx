import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import EmployeeList from "./pages/EmployeeList"
import UpdateEmployee from "./pages/UpdateEmployee"
import CreateEmployee from "./pages/CreateEmployee"
import LandingPage from "./pages/LandingPage"

function App() {
  return <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App