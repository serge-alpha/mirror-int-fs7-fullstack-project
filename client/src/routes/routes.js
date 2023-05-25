import React  from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../layout/Login";
import Books from "pages/Books";
import CreateBook from "pages/CreateBook";
import Home from "pages/Home";
import Nav from "layout/Navbar";
import SignUp from "layout/signup";
import Book from "pages/Book";
import Profile from "pages/Profile";
import Borrow from "pages/Borrow";

const Index=()=>{
    return(
        <BrowserRouter>   
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/logout" element={<Home/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/book" element={<Book/>}/>
                <Route path="/borrowed-book" element={<Borrow/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/create-book" element={<CreateBook/>} />
            </Routes>
        </BrowserRouter>
    )

};

export default Index;