const Item = require("../models/items")

exports.getItems = async(req, res)=>{
    // do not show items whose quantity is zero
    const result = await Item.find({ available_quantity: { $gt: 0 } })
    res.status(200).send({message:result})
}

exports.addItems = async(req, res)=>{
    const items = req.body
    let successfullInserts = []  // to store info of successfully saved items to DB
    let failedInserts = [] // to store info of items not able to save to DB
    for(let i =0; i<items.length; i++){
        const {name, price, available_quantity, display_image_url} = items[i]
        const itemData = { name, price, available_quantity }
        if(display_image_url){
            itemData.display_image_url = display_image_url
        }
        try {
            const item = new Item(itemData)
            const result = await item.save()
            successfullInserts.push(result)
            
        } catch (error) {
            failedInserts.push(items[i])
        }
    }
    res.status(200).send({successfullInserts:successfullInserts, failedInserts:failedInserts})
}

// there are two type of updateItems one for bulk and one for updating single item at a time

// update single item at a time
exports.updateItem = async(req, res)=>{
    // update single item
    const {_id, available_quantity} = req.body
    const result = await Item.updateOne(
        {"_id":_id},
        {$set:{"available_quantity":available_quantity}}
    )
    // console.log(result)
    res.status(200).send({message:"successfully update"})
}

// update in Bulk
exports.updateInBulk = async(req, res)=>{
    try {
        // in this  case if something went wrong while updating item we will have to roll back
        const items = req.body
        for(let i = 0; i<items.length; i++){
            const result = await Item.updateOne(
                {"_id":items[i]._id},
                {$set:{"available_quantity":items[i].available_quantity}}
            )
            // console.log(result)
        }
        res.status(200).send({message:"successfull update"})
    } catch (error) {
        res.status(400).send({message:"something went wrong"})
    }
}
