import React from "react";
import { NavLink } from "react-router-dom";

const Home=(handleState)=>{
   
    return(
         <div className="home">  
                <b>Welcome to</b>
                <h1>E-Libabry</h1>
                <NavLink to="/login" className="nav_link login_btn">Login</NavLink>
         </div>
        
        
    )
}

export default Home;