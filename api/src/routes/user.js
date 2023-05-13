const { createUser, verifyUser, updateUser, getAllUsers, loginUser, logoutUser, forgetPassword, resetPassword, deleteUser, getSingleUser } = require('../controllers/user');
const { isLogin, isLogOut, isAmin } = require('../middleware/auth');
const limiter = require('../middleware/limiter');
const { uploadUser } = require('../middleware/storeUserFile');
const { registerUserValidator, Validation } = require('../middleware/validator');


const userRouter =require('express').Router();

// 
userRouter.post('/', uploadUser.single('image'),registerUserValidator,Validation,createUser)
userRouter.get('/verify',verifyUser);
userRouter.put('/update',isLogin,isAmin,updateUser);
userRouter.get('/',isLogin,isAmin,getAllUsers);
userRouter.post('/login',limiter,loginUser);
userRouter.get('/logout',logoutUser);
userRouter.post('/forget-password',isLogOut,forgetPassword);
userRouter.post('/reset-password',isLogOut,resetPassword);
userRouter.get('/:id',isLogin,getSingleUser);
userRouter.delete('/:id',isLogin,isAmin,deleteUser);


module.exports=userRouter;