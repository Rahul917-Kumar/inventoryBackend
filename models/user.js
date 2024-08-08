const mongoose = require("mongoose")
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role: {
        type: String,
        enum: ['ADMIN', 'CUSTOMER'],
        default: 'CUSTOMER'
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User

