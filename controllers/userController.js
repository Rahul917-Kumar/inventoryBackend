const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = "HIIAMRAHULKUMARDHYANICREATINGASSIGNMENTFORWENDOR"

exports.getAllUsers = async(req, res)=>{
    const result = await User.find({})
    res.status(200).send({result:result})
}

exports.registerUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body
        
        // check whether a user exists with same userEmail
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            throw new Error("user already exists")
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({name, email, password:hashedPassword, role:"ADMIN"})
        const result = await user.save()
        res.status(200).send({message:"user added succesfully", result:result})
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message, result:{}})
    }
} 

exports.loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({
            email
        })
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new Error("invalid credential")
        }else{
            const token = jwt.sign({ id: user._id, username: user.name, role:user.role}, secretKey, {
                expiresIn: '1h',
            });
            res.status(200).send({message:"successfully loggedIn", token:token})
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}