import Button from "../components/Button";
import InputField from "../components/InputField";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const myPromise = axios({
      method: "post",
      url: "https://empmanagement-i4jf.onrender.com/api/auth/signup",
      data: {
        username,
        password
      },
    })
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (data) => {
        navigate("/signin");
        return data.data.message;
      },
      error: (e) => {
        return e.response.data.error;
      },
    });
  }

  return <Card>
    <div className="space-y-10 w-2/4">
      <InputField
        label={"Username"}
        type={"text"}
        value={username}
        onChange={(e) => {
          setUsername(() => e.target.value)
        }} />
      <InputField
        label={"Password"}
        type={"password"}
        value={password}
        onChange={(e) => {
          setPassword(() => e.target.value);
        }} />
      <Button label={"Signup"} onClick={onClickHandler} />
      <p>Already have an account? <span onClick={() => navigate("/signin")} className="underline cursor-pointer">Sign in</span></p>
    </div>
  </Card>
}

export default Signup