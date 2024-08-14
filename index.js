const express = require("express")
const dotenv = require('dotenv');

const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser") 
const userRouter = require("./routers/userRouter")
const itemRouter = require("./routers/itemsRouter")
const cors = require('cors')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());

app.use("/user", userRouter)
app.use("/items", itemRouter)

app.get("/", (req, res) => res.send("Hi From Rahul"));

mongoose.connect("mongodb+srv://rahul:rahul123@cluster0.wot0u.mongodb.net/testingDB?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("database successfully connected")
}).catch(()=>{
    console.log("database not connected")
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`listening to port ${process.env.PORT}`)
})
