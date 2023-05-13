import React from "react";



const Book=(book)=>{  
    const{title,image,publisher}=book.book

    return(
         <div className="card">  
         {console.log(image)}
               <img src={`http://localhost:8080/${image}`} alt={title} className="card__img"/>
               <span className="card__body">
                 <b>Title: {title}</b>
                 <p>Publischer: {publisher}</p>
                 <span>
                    <button className="btn">Edit Book</button>
                    <button className="btn">Delete Book</button>
                    <button className="btn">Borrow Book</button>
                </span>
               </span>
               
         </div>
        
        
    )
}

export default Book;