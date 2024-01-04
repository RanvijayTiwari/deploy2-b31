const jwt=require("jsonwebtoken")
require('dotenv').config()
const auth=async(req,res,next)=>{
     const token=req.headers.authorization.split(" ")[1];

     try {
        const decoded=jwt.verify(token,process.env.SECRET);
        req.body.userID=decoded.userID;
        next();
        
     } catch (error) {
        res.status(400).send({error:error.message})
     }

    
}

module.exports={auth};