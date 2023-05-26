import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Users from "./Users";
import { UpdateUser } from "sevices/user";

const Profile=()=>{
    const {data}=useSelector(state=>state.user)
    let is_admin=data.userData.is_admin;

    const [email,setEmail]=useState(data.userData.email);
    const [name,setName]=useState(data.userData.name);
    const [id,setId]=useState(data.userData._id);
    const [edits,setEdits]=useState('');

    const handleEdits=(action)=>{
        setEdits(action)
    }
  
    const handleEmailChange=(event)=>{
        setEmail(event.target.value)
    }
    const handleNameChange=(event)=>{
        setName(event.target.value)
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
             const User= new FormData();
            User.append('name',name);
            User.append('email',email);
            User.append('id',id);
            
            await UpdateUser(User);
        toast("done!!")
        setEmail(data.userData.email)
        setName(data.userData.name)
            Navigate('')
        } catch (error) {
            alert()
            console.log(error)
        }
    }
    console.log(data)
    return(
         <div className="home">  
            <img src={data.userData.image} alt={data.userData.name} className="profile_image"/>
            <div>
                <h3>{data.userData.name}</h3>
                <span>
                {is_admin?<><a href='#user_table'><button className="btn" onClick={()=>handleEdits('users')}>View Users</button></a></>:''}
                    <a href="#update_form" ><button className="btn" onClick={()=>handleEdits('update')}>Edit Profile</button></a>
                </span>
            </div>
            {/* {edits==="update"? */}
            <div className="edit_form" id='update_form'>
                <form onSubmit={handleSubmit} className="login_form " >
                    <ToastContainer/>
                    <h2>Update Info</h2>
                    <label htmlFor="email"/>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" required/>      
                    <label htmlFor="password" />
                    <input type="text" name="name" value={name} placeholder="Name" onChange={handleNameChange} required></input>
                <button type="submit" className="login_btn" onClick={()=>handleEdits()}>Update</button>
                </form>
            </div>
            {/* :''} */}
            {edits==="users"?
            <div id="user_table">
                <Users/>
                <button className="login_btn" onClick={()=>handleEdits()} >Done</button>
            </div>
            :''}
            
         </div>    
    )
}

export default Profile;