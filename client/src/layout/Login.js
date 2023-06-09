
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser} from "sevices/user";
import {ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/features/userSlice";


const Login=()=>{
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

let navigate=useNavigate();
const dispatch=useDispatch();


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
        
       const result= await LoginUser(User);

       toast(result.message)
      dispatch(login(result.user))

        navigate('/books')
    } catch (error) {
        toast("Wrong userName or Password")
    }
    setPassword('');
    setEmail('');
}

    return(
            <form onSubmit={handleSubmit} className="login_form">
                <ToastContainer/>
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