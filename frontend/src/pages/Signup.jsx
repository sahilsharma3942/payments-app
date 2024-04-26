import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";

const Signup = ()=>{

const [firstname,setFirstName] = useState("dsd");
const [lastname,setLastName] = useState("");
const [username,setUsername]= useState("");
const [password,setPassword] =  useState("");
const navigate = useNavigate();

return (
<div className=" bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="bg-white p-2 text-center rounded-lg w-80 h-max px-4">
        <Heading title={"Sign Up"}/>
        <Subheading title={"Enter your information to create your profile"}/>
        <InputBox label={"Firstname"} placeholder={"Sahil"} onChange={(e)=>{setFirstName(e.target.value)}}/>
        <InputBox label={"Lastname"} placeholder={"Sharma"} onChange={(e)=>{setLastName(e.target.value)}}/>
        <InputBox label={"Username"} placeholder={"sahilsharma@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}}/>
        <InputBox label={"Password"} placeholder={"12345678"} onChange={(e)=>{setPassword(e.target.value)}}/>
        <div>
            <Button label={"Sign up"} onClick={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstname,
                    lastname,
                    password
                });
                console.log(response.data.message);
                localStorage.setItem("token",response.data.token);
                navigate("/Dashboard");
            }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to="/signin"></BottomWarning>
        </div>
    </div>
</div>
)



}

export default Signup;