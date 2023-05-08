
import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login=()=>{
const [email,setEmail]=useState('');
const [name,setName]=useState('');
const [password,setPassword]=useState('');
const [image,setImage]=useState('');

const handleEmailChange=(event)=>{
    setEmail(event.target.value)
}
const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
}
const handleImageChange=(event)=>{
    setImage(event.target.files[0])
}
const handleNameChange=(event)=>{
    setName(event.target.value)
}
const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
        const newUser= new FormData();
        newUser.append('name',name);
        newUser.append('image',image);
        newUser.append('password',password);
        newUser.append('email',email);

        const res=await axios.post('http://localhost:8080/api/user',newUser);
        console.log(res)

    } catch (error) {
        console.log(error)
    }
    setName('');
    setImage('');
    setPassword('');
    setEmail('');
}

    return(
            <form onSubmit={handleSubmit} className="login_form">
                <h2>Login</h2>
                <label htmlFor="title" />
                <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Name" required/>
                <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" required/>      
                <label htmlFor="content" />
                <input type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange} required></input>
                <label htmlFor="image" />
                <input type="file" name="image"  onChange={handleImageChange} accept="image/*" required/>
            <button type="submit" className="login_btn">Login</button>
            </form>
    )
}

export default Login;