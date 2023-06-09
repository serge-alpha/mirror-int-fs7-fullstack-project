const createError=require('http-errors');
const { succesMessage } = require('../helper/Response');
const { EncryptPassword, comparePassword } = require('../helper/encrpt_decrypt');
const User = require('../model/user');
const { createToken } = require('../middleware/storeUserFile');
const dev = require('../config');
const jwt=require('jsonwebtoken');
const sendEmailWithNodeMailer = require('../helper/email');
const { createNextState } = require('@reduxjs/toolkit');

console.log(sendEmailWithNodeMailer)
const createUser=async(req,res,next)=>{
    try {
        const { name, email, password } = req.body;
        const image = req.file && req.file.path;
        if(!name){
            throw createError(404,'Please input User name');
        }
        if(!password){
            throw createError(404,'Please input Password');
        }
        if(!email){
            throw createError(404,'Please input Email');
        }
        if(password.length < 6){
            throw createError(400,'Password must be greater than 6 characters');
        }
        const hashPassword=await EncryptPassword(password);
        if(image && image.size > (1024 *1024)){
            throw createError(400,'Image size must be less than 2Mbs');
        }
        //Check if user exist
        const user= await User.findOne({email});
        if(user){
            throw createError(400,"User with this email already exist");
        }
       
        //creating token with and without image
        let token={name,email,hashPassword};
        if(image){
            token={...token,image:image.path}
        }
         token= await createToken(token);
        const emailData={
            email,
            subject:"Verify your email",
            html:`<h1>Click here to verify your email</h1>
            <p>Click here to <a href="${dev.app.clientUrl}/auth/activate/${token}" target="_blank"> activate your account </a> </p>`,
        }

        await sendEmailWithNodeMailer(emailData);
        succesMessage(res,200,'verify your email please',token);

    } catch (error) {
        next(error)
    }
}

const verifyUser=(req,res,next)=>{
    try {
        console.log(req)
        const {token}=req.body;
        if(!token){
            throw createError(404,"token is missen");
        }
        jwt.verify(token, dev.app.privateKey, async(err, decoded)=> {
            if (err){
                throw  createError(404,'token has expired')
            }
               const {name,email,hashPassword,image}=decoded;
              const isExist= await User.findOne({email:email});
             if(isExist){
                throw createError(401,'User already exist with this email')
             }
             const newUser= new User({
                name:name,
                email:email,
                password:hashPassword,
                is_verified:true
            });

            if(image){
                newUser.image=image.path   
            }
            
           const user=await newUser.save();
           await succesMessage(res,200,'Email Verified',user);
            });
          
       
       
    } catch (error) {
        next(error)
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body; 
        if(!email){
            throw createError(404,"Please input your email adress");
        }
        if(!password){
            throw createError(404,"Please input your password");
        }
        const user= await User.findOne({email:email});
        
        if(!user){
            return res.status(400).json({message:"No user with this email"});
        }
        const passWordMatch=await comparePassword(password,user.password);
        console.log(password)
        if(!passWordMatch){
            return res.status(400).json({message:"Name or password is wrong"})
        }
        // creating token auth for login user
       const token= await jwt.sign({id:user._id}, dev.app.authkey,{expiresIn:"60m"});
       
    // store token in cookie
    
        res.cookie('accessToken',token,{
            expires:new Date(Date.now() + 1000 *60*29),
            httpOnly:true,
            // secure:true,
            sameSite:true
        });
       
        res.status(200).json({
           
            message:"Login successful",
            user:{
                data:user,
            }
         })
         //req.headers.cookie=res.
    } catch (error) {
        res.json({error})
       // res.status(500).json({message:"something went wrong"})
    }
}

const updateUser=async(req,res,next)=>{
   
    try {
        const id=req.params.id
        const image=req.file && req.file.path;
        const user= await User.findById(id);
        if(!user){
            throw createError(400,"user with this Id doesn't exist")
        }
        const userUpdate=await User.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!userUpdate){
            throw createError(400,'User was not updated');
        }
        if (image){
            userUpdate=await User.findByIdAndUpdate(id,{image:image},{new:true});
        }
        await userUpdate.save();
      succesMessage(res,200,'User updated');
    } catch (error) {
        next(error)
    }
}
const getAllUsers=async(req,res,next)=>{
    try {
        const users=await User.find({})
        if(!users){
          throw createError(404,' No User found')
        }
        succesMessage(res,200,'All Users',users)  
      } catch (error) {
          next(error)
      }
}

const getSingleUser=async(req,res,next)=>{
    try {
        const id=req.params.id
        const user=await User.findById(id)
        if(!user){
          throw createError(404,' No User found')
        }
        succesMessage(res,200,'Single User',user)  
      } catch (error) {
          next(error)
      }
}

const forgetPassword=async(req,res,next)=>{
    try {
       const{email,password}=req.body;
       if(!email||!password){
        throw createError(404,'Email or password not found')  
    }
    if(password.length<6){
        throw createError(404,'min length of pass word is 6')
    }
    const user= await User.findOne({email:email});
        if(!user){
            throw createError(400,"user with this email doesn't exist");
        }             
        const hashPassword=await EncryptPassword(password);
        const token=await createToken({email,hashPassword});

        //create email to be sent

        const emailData={
            email,
            subject:"reset password",
            html:`<h1>Click here to verify reset your</h1>
            <p>Click here to<a href="${dev.app.clientUrl}/auth/reset-password/${token} target="_blank">Reset password</a></p>`,
        }

        sendMail(emailData);
        succesMessage(res,200,"Click link in email to update password",token)
    } catch (error) {
        createNextState(error)
    }
}

const resetPassword= async(req,res)=>{
    try { 
        const {token}=req.body;
        console.log(token)
        if(!token){
            throw createError(404,"token is missen")
        }
        jwt.verify(token, dev.app.privateKey, async(err, decoded)=> {
            if (err){
                throw createError(401,"token has expired")
            }
              const {email,hashPassword}=decoded;
              const user= await User.findOne({email:email});
             if(!user){
                throw createError(400,"user with this email doesnt exist")
             }
           await User.updateOne({email:email},{
                $set:{
                    password:hashPassword
                }
            })
            succesMessage(res,200,'Password was reseted successsfuly')
            
            });
          
       
    } catch (error) {
        next(error)
    }
}

const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;
        const isExist= await User.findById(id);
        if(!isExist){
           throw createError(404,"user with this Id doesn't exist");
        }
        const userData=await User.findByIdAndDelete(id);
        console.log(userData)
        res.status(200).json({message:'user is deleted',ok:true})
    } catch (error) {
        res.status(500).json({message:"somthing went wrong"})
    }
}

const logoutUser=(req,res)=>{
    try {
        if(req.headers.cookie){
             const id=req.headers.cookie.split('=')[0];
            res.clearCookie(id)
            res.status(200).json({message:"Logout succesful"}) 
        }else{
            res.status(404).json({message:"You are logged out . Please log in"})
        }
              

    } catch (error) {
        res.status(500).json({message:"Something went wrong"})  
    }
}
module.exports={createUser,forgetPassword,resetPassword,verifyUser,updateUser,getAllUsers,loginUser,logoutUser,deleteUser,getSingleUser}