import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { logout } from "store/features/userSlice";

const Nav=()=>{
    const dispatch=useDispatch()
    
    
    const {data}=useSelector(state=>state.user)
    let is_admin=data.userData.is_admin;
  console.log(data.is_Login)
    const handleLogout=()=>{
        dispatch(logout())
        Navigate('/')
    }
    return(
        <nav className="nav">
          < div className="nav_links"> 
            {data.is_Login?'': 
                <>
                    <NavLink to="/" className="nav_link">Home</NavLink>
                    <NavLink to="/signup" className="nav_link">SignUp</NavLink>
                </>}
            { data.is_Login ? 
                <>
                    <NavLink to="/books" className="nav_link">Books</NavLink>
                    {is_admin?<NavLink to="/create-book" className="nav_link">Create Book</NavLink>:''}
                    <NavLink to="/profile" className="nav_link">Profile</NavLink> 
                    <NavLink to="/borrowed-book" className="nav_borrow">No of borrowed books</NavLink>
                </>: ''}
            </div> 
            <div >
                <h4>
                    {data.is_Login?<NavLink to="/logout" className="nav_link" onClick={handleLogout}>Logout</NavLink>:''}
                </h4> 
            </div>
        </nav>
    )
}

export default Nav;