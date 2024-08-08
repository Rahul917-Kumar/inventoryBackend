const mongoose = require("mongoose")
const {Schema} = mongoose

const ItemSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    name:{type:String, required:true},
    price:{type:String, required:true},
    available_quantity:{type:Number, required:true},
    display_image_url:{type:String, default:"http://example.com/images/default.jpg"}
})

const Item = mongoose.model("Item", ItemSchema)
module.exports = Item