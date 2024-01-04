const { Router } = require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {PostModel}=require("../model/post.model");
const { auth } = require("../middleware/auth.middleware");
const postRouter=Router()
require('dotenv').config()



// getproduct
postRouter.get("/products", auth,async(req,res)=>{


    try {
        
            const post=await PostModel.find()
        

        res.status(200).send({msg:"User Posts",post})
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }

})

// getproductbyid
postRouter.get("/products/:id",auth,async(req,res)=>{


    try {
        
            const post=await PostModel.findById(req.params.id)
            if (!post) return res.status(404).json({ message: 'Product not found' });

        res.status(200).send({msg:"User Posts",post})
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }

})



// addproducts
postRouter.post("/products",auth,async(req,res)=>{
     const {userID}=req.body;

    try {
        const post=new PostModel({...req.body,userID});
        await post.save();
        res.status(200).send({msg:"Post was added",post});
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }
})

// update product by id /update/:postID
postRouter.patch("/products/:id",auth,async(req,res)=>{
     const {id}=req.params;
     const {userID}=req.body;

    try {
        const post=await PostModel.findByIdAndUpdate({userID,_id:id},{
            ...req.body,
            updated_at: new Date(),
          })
        if(post){
            res.status(200).send({msg:"Post updated"});  
        }else{
            res.status(200).send({msg:"Post not found"});
        }
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }
})

// delete post by id /delete/:postID
postRouter.delete("/products/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const {userID}=req.body;

   try {
       const post=await PostModel.findByIdAndDelete({userID,_id:id})
       if(post){
           res.status(200).send({msg:"Post Deleted"});  
       }else{
           res.status(200).send({msg:"Post not found"});
       }
   } catch (error) {
       res.status(400).send({error:error.message}) 
   }
})


module.exports={postRouter}