import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Users from "./Users";
import { UpdateUser } from "sevices/user";

const Profile=()=>{
    const {user}=useSelector(state=>state.user)
    let is_admin=user.userData.is_admin;

    const [email,setEmail]=useState(user.userData.email);
    const [name,setName]=useState(user.userData.name);
    const [id,setId]=useState(user.userData._id);
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
            
            await UpdateUser(User,id);
        toast("done!!")
        setEmail(user.userData.email)
        setName(user.userData.name)
            Navigate('')
        } catch (error) {
            alert(error)
           
        }
    }
    console.log(user)
    return(
         <div className="home">  
            <div className=" profile_row">
                <img src={user.userData.image} alt={user.userData.name + " picture"} className="profile_image"/>
                <div>
                    <h3>{user.userData.name}</h3>
                    <span>
                    {is_admin?<><a href='#user_table'><button className="btn" onClick={()=>handleEdits('users')}>View Users</button></a></>:''}
                        <a href="#update_form" ><button className="btn" onClick={()=>handleEdits('update')}>Edit Profile</button></a>
                    </span>
                </div>
            </div>
            {/* {edits==="update"? */}
            <div className="edit_form profile_row" id='update_form' >
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
            <div id="user_table" className="profile_row">
                <Users/>
                <button className="login_btn" onClick={()=>handleEdits()} >Done</button>
            </div>
            :''}
            
         </div>    
    )
}

export default Profile;

// document.getElementById("myP").style.visibility = "hidden";