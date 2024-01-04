const { Router } = require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel}=require("../model/user.model")
const userRouter=Router()
require('dotenv').config()


userRouter.post("/register",async(req,res)=>{
try { 
    const email=req.body.email;
    const user=await UserModel.findOne({email})

    if(user){
        res.status(400).send({msg:"User already exists"})

    }else{
        bcrypt.hash(req.body.password, 8, async(err, hash) =>{
            if(hash){
                const newuser=new UserModel({...req.body,password:hash})
                await newuser.save();
                res.status(200).send({msg:"User Registration Successfull"})
            }
            // Store hash in your password DB.
        });
    }
} catch (error) {
    
    res.status(400).send({error:error.message})
}    
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;


    try {
        
        const user=await UserModel.findOne({email})
    
        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result){
                    var token = jwt.sign({ userID:user._id }, process.env.SECRET);
                    res.status(200).send({msg:'Login Successfull',token:token})
    
                }else{
                    res.status(200).send({msg:"INCOREECT Password"})
                }
                // result == true
            })
    
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
   
})


module.exports={userRouter}