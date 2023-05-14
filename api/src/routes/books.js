const { createBook, getAllBooks, deleteBook, updateBook, getSingleBook, resetBook, createPublisher } = require('../controllers/book');
const { isLogin, isAmin } = require('../middleware/auth');
const { uploadBook } = require('../middleware/storeBookFile');
const { createBookValidator, Validation } = require('../middleware/validator');



const bookRouter =require('express').Router();

bookRouter.post('/reset',resetBook);
bookRouter.post('/',isLogin,isAmin,uploadBook.single('image'),createBookValidator,Validation,createBook);
bookRouter.post('/publisher',isLogin,isAmin,uploadBook.single('image'),createPublisher);
bookRouter.get('/',getAllBooks)//isLogin,isAmin
bookRouter.delete('/:slug',isLogin,deleteBook)
bookRouter.get('/:slug',getSingleBook);
bookRouter.put('/',isLogin,isLogin,isAmin,uploadBook.single('image'),updateBook)

module.exports=bookRouter;