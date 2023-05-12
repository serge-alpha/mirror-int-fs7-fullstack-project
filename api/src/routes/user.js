const { createUser, verifyUser, updateUser, getAllUsers, loginUser, logoutUser, forgetPassword, resetPassword, deleteUser } = require('../controllers/user');
const { isLogin, isLogOut } = require('../middleware/auth');
const limiter = require('../middleware/limiter');
const { uploadUser } = require('../middleware/storeUserFile');
const { registerUserValidator, Validation } = require('../middleware/validator');


const userRouter =require('express').Router();

// 
userRouter.post('/', uploadUser.single('image'),registerUserValidator,Validation,createUser)
userRouter.get('/verify',verifyUser);
userRouter.put('/update',isLogin,updateUser);
userRouter.get('/',getAllUsers);
userRouter.post('/login',limiter,loginUser);
userRouter.get('/logout',logoutUser);
userRouter.post('/forget-password',isLogOut,forgetPassword);
userRouter.post('/reset-password',isLogOut,resetPassword);
userRouter.delete('/:id',isLogin,deleteUser);


module.exports=userRouter;