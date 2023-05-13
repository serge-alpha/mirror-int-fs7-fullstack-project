
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "sevices/user";


const Login=()=>{
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
let navigate=useNavigate();

const handleEmailChange=(event)=>{
    setEmail(event.target.value)
}
const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
}

const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
         const User= new FormData();
        User.append('password',password);
        User.append('email',email);
        const res=await loginUser(User);
        console.log(res)
       

        // const res=await axios.post('http://localhost:8080/api/user/login',User);
        // console.log(res)
        navigate('/books')
    } catch (error) {
        console.log(error)
    }
    setPassword('');
    setEmail('');
}

    return(
            <form onSubmit={handleSubmit} className="login_form">
                <h2>Login</h2>
                <label htmlFor="email"/>
                <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" required/>      
                <label htmlFor="password" />
                <input type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange} required></input>
            <button type="submit" className="login_btn">Login</button>
            </form>
    )
}

export default Login;