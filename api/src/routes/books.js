const { createBook, getAllBooks, deleteBook, updateBook, getSingleBook } = require('../controllers/book');
const { isLogin } = require('../middleware/auth');
const { uploadBook } = require('../middleware/storeBookFile');
const { createBookValidator, Validation } = require('../middleware/validator');



const bookRouter =require('express').Router();


bookRouter.post('/',uploadBook.single('image'),createBookValidator,Validation,createBook);
bookRouter.get('/',getAllBooks)//isLogin,
bookRouter.delete('/:slug',isLogin,deleteBook)
bookRouter.get('/:slug',getSingleBook);
bookRouter.put('/',isLogin,uploadBook.single('image'),updateBook)

module.exports=bookRouter;