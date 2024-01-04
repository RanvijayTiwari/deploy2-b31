const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./route/user.route")
const { postRouter } = require("./route/post.route")
var cors = require('cors')
// const { auth } = require("./middleware/auth.middleware")
const app=express()


app.use(express.json())
app.use(cors())
app.use("/api",userRouter,postRouter)




// app.listen(8080,async()=>{
//     try {
//         await connection
//         console.log("connected")
//     } catch (error) {
//         console.log(error)
//     }
// })

const connectDB = async () => {
    try {
      const conn = await connection
      console.log(`MongoDB Connected:`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  connectDB().then(() => {
    app.listen(8080, () => {
        console.log("listening for requests");
    })
})