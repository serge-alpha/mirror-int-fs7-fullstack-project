import React from "react";



const Book=(book)=>{  
    const{title,image,publisher}=book.book

    return(
         <div className="card">  
               <img src={image} alt={title} className="card__img"/>
               <span className="card__body">
                 <b>Title: {title}</b>
                 <p>Publischer: {publisher}</p>
               </span>
               
         </div>
        
        
    )
}

export default Book;