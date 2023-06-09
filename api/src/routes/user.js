const { createUser, verifyUser, updateUser, getAllUsers, loginUser, logoutUser, forgetPassword, resetPassword, deleteUser, getSingleUser } = require('../controllers/user');
const { isLogin, isLogOut, isAmin } = require('../middleware/auth');
const limiter = require('../middleware/limiter');
const { uploadUser } = require('../middleware/storeUserFile');
const { registerUserValidator, Validation } = require('../middleware/validator');


const userRouter =require('express').Router();

// ,isAmin
userRouter.post('/', uploadUser.single('image'),registerUserValidator,Validation,createUser)
userRouter.post('/verify',verifyUser);
userRouter.put('/update/:id',isLogin,updateUser);
userRouter.get('/',getAllUsers); 
userRouter.post('/login',limiter,uploadUser.single('image'),loginUser);
userRouter.get('/logout',logoutUser);
userRouter.post('/forget-password', uploadUser.single('image'),isLogOut,forgetPassword);
userRouter.post('/reset-password', uploadUser.single('image'),isLogOut,resetPassword);
userRouter.get('/:id',isLogin,getSingleUser);
userRouter.delete('/:id',isLogin,isAmin,deleteUser);


module.exports=userRouter;