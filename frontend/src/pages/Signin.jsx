import axiosInstance from "../api/axios";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Card from "../components/Card";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const myPromise = axiosInstance({
      method: "post",
      url: "/api/auth/signin",
      data: {
        username,
        password
      },
    })
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (data) => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", username);
        navigate("/dashboard");
        return "Signin Successfull";
      },
      error: (e) => {
        console.log(e);

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
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label={"Password"}
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button label={"Signin"} onClick={onClickHandler} />
      <p>Don't have an account? <span onClick={() => navigate("/signup")} className="underline cursor-pointer">Sign up</span></p>
    </div>
  </Card>
}

export default Signin;


