const Item = require("../models/items")

exports.getItems = async(req, res)=>{
    // do not show items whose quantity is zero
    const result = await Item.find({ available_quantity: { $gt: 0 } })
    res.status(200).send({message:result})
}

exports.addItems = async(req, res)=>{
    // items
    const result = await Item.insertMany(req.body)
    res.status(200).send({message:result})
}

exports.updateItems = async(req, res)=>{
    // update single item
    const {_id, available_quantity} = req.body
    const result = await Item.updateOne(
        {"_id":_id},
        {$set:{"available_quantity":available_quantity}}
    )
    console.log(result)
    res.status(200).send({message:"successfully update"})
}





