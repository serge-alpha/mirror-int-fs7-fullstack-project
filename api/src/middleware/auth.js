const jwt =require('jsonwebtoken')
const dev = require('../config')
const User = require('../model/user')
const isLogin=(req,res,next)=>{
    try {
        if(!req.headers.cookie){
            return res.status(404).send({message:'Please login'})
        }
       let token=req.headers.cookie.split("=")[1]
       token=token.split(';')[0]
        jwt.verify(token,String(dev.app.authkey),
        async(err,user)=>{
            if(err){
                return res.status(404).json({message:'Invalid Token'})
            }   
                console.log(user)  
                 req.id=user._id              
        })
        next()
    } catch (error) {
        next(error)
    }
}

const isLogOut=(req,res,next)=>{
    try {
        if(req.header.cookie){
          return res.status(404).json({message:"Please logout"}) 
          }  
          next();                    
       
    } catch (error) {
        res.status(500).json({message:"Something is wrong"});
    } 
}

const isAmin= async(req,res,next)=>{
    try {
        if(!req.headers.cookie){
           return res.status(404).json({message:'Please login'})
        }
       let id=req.headers.cookie.split("=")[0]
        let user=await User.findById(id);
        if(!user.is_admin){
           return res.status(404).json({message:'Only Admins can move ahead'})
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports={isLogin,isLogOut,isAmin}
