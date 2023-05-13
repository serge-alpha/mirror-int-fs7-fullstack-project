
const {Book,data} = require("../model/books")
const createError=require('http-errors')
const { succesMessage } = require("../helper/Response")
const slugify=require('slugify')

const getAllBooks=async(req,res,next)=>{
    try {
      const books=await Book.find({}).populate()
      if(!books){
        throw createError(404,'books is empty')
      }
      succesMessage(res,200,'All books',books)  
    } catch (error) {
        next(error)
    }
}
const getSingleBook=async(req,res,next)=>{
  try {
    const slug=req.params.slug
    const book=await Book.findOne({slug})
    if(!book){
      throw createError(404,'books is empty')
    }
    succesMessage(res,200,'return Single Book',book)  
  } catch (error) {
      next(error)
  }
}

const createBook=async(req,res,next)=>{
  try {
    console.log(req.file)
    const {title,description,publisher,publishedDate,isbn}=req.body;
    const image=req.file && req.file.originalname;
    if(!title){
        throw createError(400,"Title of book is missing");
    }
    if(!description){
      throw createError(400,"Description of book is missing");
   }
   if(!publisher){
    throw createError(400,"Publisher of book is missing");
    }
    if(!publishedDate){
      throw createError(400,"Date of book publish is missing");
   }
   if(!isbn){
    throw createError(400,"ISBN of book is missing");
 }
  
    
    const exist= await Book.findOne({title});
    console.log(exist)
    if(exist){
      throw createError(404,'Book with this title already exist. Please use a diffrent title')
    }
    
    const newBook= new Book({
        title,
        description,
        publisher,
        publishedDate,
        isbn,
        slug:slugify(title)
        });  
    if(image && image.size > (1024 *1024)){
      throw createError(400,'Image size must be less than 2Mbs');
     }    
     if(image){
      newBook.image=image
     }
   
       const book=await newBook.save();
       await succesMessage(res,200,'Book Created',book);

} catch (error) {
    next(error)
}
}
const updateBook=async(req,res,next)=>{
  try {
      const book= await Book.findById(req.body.id);
      console.log(req.file)
      const image=req.file && req.file.path;
      if(!book){
          throw createError(400,"Book with this Id doesn't exist")
      }
      const bookUpdate=await Book.findByIdAndUpdate(req.body.id,{...req.body},{new:true});
      if(!bookUpdate){
          throw createError(400,'Book was not updated');
      }
      if (image){
        bookUpdate=await Book.findByIdAndUpdate(req.body.id,{image:image},{new:true});
      }
      await bookUpdate.save();
    succesMessage(res,200,'Book updated');
  } catch (error) {
      next(error)
  }
}

const deleteBook=async(req,res)=>{
  try {
      const slug=req.params.slug;
      const book= await Book.findOne({slug:slug})
      console.log(book)
      if(!book){
          return res.status(400).json({message:"Book with this Slug doesn't exist"});
      }
     await Book.findOneAndDelete({slug});
      res.status(200).json({message:'Book is deleted',ok:true})
  } catch (error) {
      res.status(500).json({message:"something went wrong"})
  }
}

const resetBook=async()=>{
  try {
    await Book.deleteMany();
   const dummydata= new Book(data);
   res.send('BOOK RESETED')
  } catch (error) {
    createError(400,'BOOK NOT RESETTED')
  }
}
module.exports={createBook,updateBook,deleteBook,getAllBooks,getSingleBook,resetBook};