const { createBook, getAllBooks, deleteBook, updateBook, getSingleBook } = require('../controllers/book');
const { isLogin } = require('../middleware/auth');
const { uploadBook } = require('../middleware/storeBookFile');



const bookRouter =require('express').Router();


bookRouter.post('/',uploadBook.single('image'),createBook);
bookRouter.get('/',isLogin,getAllBooks)
bookRouter.delete('/:slug',isLogin,deleteBook)
bookRouter.get('/:slug',getSingleBook);
bookRouter.put('/',isLogin,uploadBook.single('image'),updateBook)

module.exports=bookRouter;