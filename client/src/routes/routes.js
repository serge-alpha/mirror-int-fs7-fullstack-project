import React  from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../layout/Login";
import Books from "pages/Books";
import CreateBook from "pages/CreateBook";
import Home from "pages/Home";
import Nav from "layout/Navbar";
import SignUp from "layout/signup";
import Profile from "pages/Profile";
import Borrow from "pages/Borrow";
import BorrowAdmin from "pages/BorrowAdmin";
import Activate from "layout/Activate";

const Index=()=>{
    return(
        <BrowserRouter>   
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/logout" element={<Home/>} />
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/auth/activate/:token" element={<Activate/>}/>
                <Route path="/books" element={<Books/>} />               
                <Route path="/borrowed-book" element={<Borrow/>}/>
                <Route path="/borrowed-book-admin" element={<BorrowAdmin/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/create-book" element={<CreateBook/>} />
            </Routes>
        </BrowserRouter>
    )

};

export default Index;