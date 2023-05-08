import React from "react";
import { NavLink } from "react-router-dom";

const Nav=()=>{
    return(
        <nav className="nav">
            <NavLink to="/" className="nav_link">Home</NavLink>
            <NavLink to="/books" className="nav_link">Books</NavLink>
            <NavLink to="/create-book" className="nav_link">Create Book</NavLink>
            <NavLink to="/profile" className="nav_link">Profile</NavLink>
        </nav>
    )
}

export default Nav;