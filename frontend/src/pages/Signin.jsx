import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ()=>{
    const navigate = useNavigate();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
return <div className=" bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="bg-white p-2 text-center rounded-lg w-80 h-max px-4">
    <Heading title={"Signin"} />
    <Subheading title={"Enter your credentials to access your account"}/>
    <InputBox label={"Username"} placeholder={"sahil@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}}/>
    <InputBox label={"Password"} placeholder={"1234678"} onChange={(e)=>{setPassword(e.target.value)}}/>
    <div>
        <Button label={"Signin"} onClick={async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });
            console.log(response.data.message);
            localStorage.setItem("token",response.data.token);
            navigate("/Dashboard");
        }}></Button>
    </div>
    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
</div>
    </div>
</div>
}


export default Signin;