const jwt =require('jsonwebtoken')
const dev = require('../config')
const User = require('../model/user')
const isLogin=(req,res,next)=>{
    try {
        const accessToken=req.cookies.accessToken
        console.log(accessToken)
        if(!accessToken){
            return res.status(422).json({message:'Please login'})
        }

        jwt.verify(accessToken,String(dev.app.authkey),
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
        const accessToken=req.cookies.accessToken
        if(accessToken){
          return res.status(422).json({message:"Please logout"}) 
          }  
          next();                    
       
    } catch (error) {
        res.status(500).json({message:"Something is wrong"});
    } 
}

const isAmin= async(req,res,next)=>{
    try {
        const accessToken=req.cookies.accessToken
        if(!accessToken){
           return res.status(404).json({message:'Please login'})
        }
        
        jwt.verify(accessToken,String(dev.app.authkey),
        async(err,user)=>{
            if(err){
                return res.status(404).json({message:'Invalid Token'})
            }   
            // await User.findById(id)
            console.log(user.is_admin)
             if(!user.is_admin){
                 return res.status(404).json({message:'Only Admins can move ahead'})
            }              
        })
        next()
        
    } catch (error) {
        next(error)
    }
}

module.exports={isLogin,isLogOut,isAmin}
