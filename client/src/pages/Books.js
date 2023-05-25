import React, { useEffect, useState } from "react";
import { getAllBooks } from "sevices/books";
import Book from "./Book";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Books=()=>{
    const [books,setBooks]=useState([])
    const[status,setStatus]=useState(false)

    useEffect(()=>{
       const fetchBooks=async()=>{
        try {
            const bookData=await getAllBooks();
            setStatus(true)
            setBooks(bookData.data)
        } catch (error) {
            console.log(error.message)
        }
       }
        fetchBooks()
       
    },[]);
   
        
    
    return(
        <div className="library">
            <ToastContainer/>
            {status?<h1>Book Library</h1>:<h1>Loading.....</h1>}
            <div className="library_content">
            {status?(books.map((book)=>{
                return (< Book book={book} key={book._id}/>)
                })):''}
            </div>
        </div>
    )
}

export default Books;