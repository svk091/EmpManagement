import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const LandingPage = () => {
  const navigate = useNavigate()
  return <Card>
    <div className="space-y-10">
      <h1 className="text-4xl font-bold tracking-widest">Empowering you to manage your team with ease and efficiency</h1>
      <div className="flex justify-around space-x-4">
        <button onClick={() => navigate("/signup")} className="border p-4 tracking-wider rounded-lg font-bold text-xl  w-full  shadow-xl hover:shadow-none">
          Signup
        </button>
        <button onClick={() => navigate('/signin')} className="border p-4 tracking-wider rounded-lg font-bold text-xl  w-full  shadow-xl hover:shadow-none">Login</button>
      </div>
    </div>
  </Card>
}

export default LandingPage;