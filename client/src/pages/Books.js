import React, { useEffect, useState } from "react";
import { getAllBooks } from "sevices/books";
import Book from "./Book";


const Books=()=>{
    const [books,setBooks]=useState([])
    const[status,setStatus]=useState(false)

    useEffect(()=>{
       const fetchBooks=async()=>{
        try {
            const books=await getAllBooks();
            setStatus(true)
            setBooks(books)
        } catch (error) {
            console.log(error.message)
        }
       }
        fetchBooks()
    },[]);
   console.log(books)
    return(
        <div className="home">
            {status?<h1>Book Library</h1>:<h1>Loading</h1>}
            <div className="library">
            {status?(books.map((book)=>{
                return (< Book book={book} key={book._id}/>)
                })):''}
            </div>
        </div>
    )
}

export default Books;