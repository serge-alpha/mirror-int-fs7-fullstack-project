import React from "react";
import { useSelector } from "react-redux";



const Book=(book)=>{  
    const{title,image,publisher}=book.book

    const {data}=useSelector(state=>state.user)
    let is_admin=data.userData.is_admin;
    console.log(is_admin)
    return(
         <div className="card">  
               <img src={image} alt={title} className="card__img"/>
               <span className="card__body">
                 <b>Title: {title}</b>
                 <p>Publischer: {publisher}</p>
                 <span>
                    {is_admin?<><button className="btn">Edit Book</button>
                    <button className="btn">Delete Book</button></>:''}
                    <button className="btn">Borrow Book</button>
                </span>
               </span>
               
         </div>
        
        
    )
}

export default Book;