const mongoose = require("mongoose")
const {Schema} = mongoose

const ItemSchema = new Schema({
    // category: { type: Schema.Types.ObjectId, ref: 'Category' },
    name:{type:String, required:true},
    price:{type:Number, required:true},
    available_quantity:{type:Number, required:true},
    display_image_url:{type:String, default:"https://res.cloudinary.com/de7fldt0n/image/upload/v1723560741/vtmqij3e0jsbp8ofacpt.png", required:false},
    createdAt: {type: Date, default: Date.now}

})

const Item = mongoose.model("Item", ItemSchema)
module.exports = Item