import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { removeBookFromBorrowList } from "store/features/bookSlice";

const Borrow=(handleState)=>{
     const {book}=useSelector(state=>state.books)
     const dispatch=useDispatch()
     const handleBorrow=()=>{
          dispatch(removeBookFromBorrowList())
     }
    return(
     <div className="library">
     <ToastContainer/>
     <h1>Book Library</h1>
     <div className="library_content">
     {book?(book.map((book)=>{
         return (
             <div className="card">  
         <img src={book.book.image} alt={book.book.title} className="card__img"/>
         <span className="card__body">
           <b>Title: {book.book.title}</b>
           <p>Publischer: {book.book.publisher}</p>
           <span>
              <button className="btn" onClick={()=>handleBorrow(book={id:book.book._id})}>Return Book</button>
          </span>
         </span>
         
   </div>
)
         })):''}
     </div>
 </div>
        
        
    )
}

export default Borrow;