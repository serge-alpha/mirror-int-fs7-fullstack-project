import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { logout } from "store/features/userSlice";

const Nav=()=>{
    const dispatch=useDispatch()
    
    
    const {user}=useSelector(state=>state.user)
    let is_admin=user.userData.is_admin;
    const handleLogout=()=>{
        dispatch(logout())
        Navigate('/')
    }
    return(
        <nav className="nav">
          < div className="nav_links"> 
            {user.is_Login?'': 
                <>
                    <NavLink to="/" className="nav_link">Home</NavLink>
                    <NavLink to="/signup" className="nav_link">SignUp</NavLink>
                </>}
            { user.is_Login ? 
                <>
                    <NavLink to="/books" className="nav_link">Books</NavLink>
                    {is_admin?
                    <>
                        <NavLink to="/create-book" className="nav_link">Create Book</NavLink>
                        <NavLink to="/borrowed-book-admin" className="nav_borrow">No of borrowed books</NavLink>
                    </>:''}
                    <NavLink to="/profile" className="nav_link">Profile</NavLink> 
                    {!is_admin?<NavLink to="/borrowed-book" className="nav_borrow"> Borrowed_books</NavLink>:''}
                </>: ''}
            </div> 
            <div >
                <h4>
                    {user.is_Login?<NavLink to="/logout" className="nav_link" onClick={handleLogout}>Logout</NavLink>:''}
                </h4> 
            </div>
        </nav>
    )
}

export default Nav;