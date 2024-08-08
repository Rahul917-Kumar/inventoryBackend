const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser") 
const shopperRouter = require("./routers/shopperRouter")
const adminRouter = require("./routers/adminRouter")
const userRouter = require("./routers/userRouter")

app.use(express.json())
app.use(bodyParser.json())
app.use("/shopper", shopperRouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect("mongodb+srv://rahul:rahul123@cluster0.caeuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("database successfully connected")
}).catch(()=>{
    console.log("database not connected")
})

app.listen(8080, ()=>{
    console.log("listening to port 8080")
})