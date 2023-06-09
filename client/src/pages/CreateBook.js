
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBook } from "sevices/books";

const CreateBlog=()=>{
const [title,setTitle]=useState('');
const [isbn,setIsbn]=useState('');
const [description,setDescription]=useState('');
const [publisher,setPublisher]=useState('');
const [publishedDate,setPublishedDate]=useState('');
const [image,setImage]=useState('');

const handletitleChange=(event)=>{
    setTitle(event.target.value)
}
const handlePubDateChange=(event)=>{
    setPublishedDate(event.target.value)
}
const handlePubChange=(event)=>{
    setPublisher(event.target.value)
}
const handleIsbnChange=(event)=>{
    setIsbn(event.target.value)
}
const handleDescriptionChange=(event)=>{
    setDescription(event.target.value)
}
const handleImageChange=(event)=>{
    setImage(event.target.files[0])
}
const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
        const newBook= new FormData();
        newBook.append('title',title);
        newBook.append('image',image);
        newBook.append('isbn',isbn);
        newBook.append('publisher',publisher);
        newBook.append('publisherDate',publishedDate);
        newBook.append('content',description);

       await createBook(newBook);
      toast('book created')
    } catch (error) {
       toast(error)
       
    }
    setDescription('');
    setTitle('')
    setPublisher('')
    setImage('');
    setDescription('');
    setIsbn('');
    setPublishedDate('');
    setTitle('');
}

    return(
        <form onSubmit={handleSubmit} className="login_form">
        
            <h2>CreateBook</h2>
            <label htmlFor="title" />
            <input type="text" name="title" value={title} onChange={handletitleChange} placeholder="Title" required/>
            <label htmlFor="publisher" />
            <input type="text" name="publisher" value={publisher} onChange={handlePubChange} placeholder="Publischer" required/>
            <label htmlFor="publisherDate" />
            <input type="date" name="pubDate" value={publishedDate} onChange={handlePubDateChange} placeholder="pubDate" required/>
            <label htmlFor="isbn" />
            <input type="isbn" name="isbn" value={isbn} onChange={handleIsbnChange} placeholder="ISBN" required/>
            <label htmlFor="image" />
            <input type="file" name="image"  onChange={handleImageChange} accept="image/*"  placeholder="Book Image"/>
            <label htmlFor="description" />
            <textarea name="description" value={description} placeholder="Description" onChange={handleDescriptionChange} required></textarea>
           <button type="submit" className="btn">Create Book</button>
        </form>
    )
}

export default CreateBlog;