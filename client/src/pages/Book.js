import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToBorrowList, removeBookFromBorrowList } from "store/features/bookSlice";



const Book=(data)=>{  
    const{title,image,publisher,_id}=data.book
    const {user}=useSelector(state=>state.user)
    const {book}=useSelector(state=>state.books)
    const [borrowState,setBorrowState]=useState("Borrow Book")
    const dispatch=useDispatch()
    let is_admin=user.userData.is_admin;
    const bookInfo={
        user:{
            name:user.userData.name,
            id:user.userData._id
        },
        book:{
            title,
            id:_id
        }
    }
    const handleBorrow=()=>{
        if(borrowState==="Borrow Book"){
            dispatch(addBookToBorrowList(bookInfo))
            setBorrowState('Return Book')
        }else{
            dispatch(removeBookFromBorrowList(bookInfo))
            setBorrowState('Borrow Book')
        }
    }
    return(
         <div className="card">  
               <img src={image} alt={title} className="card__img"/>
               <span className="card__body">
                 <b>Title: {title}</b>
                 <p>Publischer: {publisher}</p>
                 <span>
                    {is_admin?<><button className="btn">Edit Book</button>
                    <button className="btn">Delete Book</button></>:''}
                    {is_admin? '':<button className="btn" onClick={handleBorrow} >{borrowState}</button>}
                </span>
               </span>
               
         </div>
        
        
    )
}

export default Book;