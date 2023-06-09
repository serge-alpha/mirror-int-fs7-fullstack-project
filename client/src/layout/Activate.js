
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  verifyUser } from "sevices/user";


const Activate=()=>{
    const params =useParams()
    const navigate=useNavigate()
    const token=params.token;

const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
        console.log(token)
      const result=await verifyUser(token);

      toast(result.message)
      navigate('/login')

    } catch (error) {
        alert(error)
    }
}

    return(
        <div>
            <h3>Click the botton below to activate your account</h3>
            <button type="submit" className="login_btn" onClick={handleSubmit} >Activate</button>
        </div>
         
    )
}

export default Activate;