import React  from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from "../layout/Login";
import Books from "pages/Books";
import CreateBook from "pages/CreateBook";
import Home from "pages/Home";
import Nav from "layout/Navbar";

const Index=()=>{
    return(
        <BrowserRouter>   
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/create-book" element={<CreateBook/>} />
            </Routes>
        </BrowserRouter>
    )

};

export default Index;