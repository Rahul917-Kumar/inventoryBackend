const Item = require("../models/items")

exports.getItems = async(req, res)=>{
    // do not show items whose quantity is zero
    const result = await Item.find({ available_quantity: { $gt: 0 } }).sort({ createdAt: -1 }).exec();
    res.status(200).send(result)
}

exports.addItems = async(req, res)=>{
    const items = req.body
    // try {
    //     for(let i =0; i<items.length; i++){
    //         const {name, price, available_quantity, display_image_url} = items[i]
    //         const itemData = { name, price, available_quantity }
    //         if(display_image_url){
    //             itemData.display_image_url = display_image_url
    //         }
    //         const item = new Item(itemData)
    //         await item.save()
    //     }
    //     res.status(200).send({message:"Items Added Successfull"})
    // } catch (error) {
    //     res.status(400).send({message:"something went wrong"})
    // }
    const itemsToInsert = items.map(item => {
        const { name, price, quantity, image_url } = item;
        return {
            name,
            price,
            available_quantity:quantity,
            display_image_url: image_url || "https://res.cloudinary.com/de7fldt0n/image/upload/v1723560741/vtmqij3e0jsbp8ofacpt.png"
        };
    });

    try {
        await Item.insertMany(itemsToInsert);
        res.status(200).send({ message: "Items Added Successfully" });
    } catch (error) {
        console.error("Error adding items:", error);
        res.status(400).send({ message: "Something went wrong" });
    }
}

// update single item at a time
exports.updateItem = async(req, res)=>{
    // update single item
    console.log(req.body)
    const {_id, available_quantity} = req.body
    const result = await Item.updateOne(
        {"_id":_id},
        {$set:{"available_quantity":available_quantity}}
    )
    res.status(200).send({message:"successfully update"})
}

// update in Bulk
exports.updateInBulk = async(req, res)=>{
    try {
        const items = req.body
        for(let i = 0; i<items.length; i++){
            const result = await Item.updateOne(
                {"_id":items[i]._id},
                {$set:{"available_quantity":items[i].available_quantity}}
            )
        }
        res.status(200).send({message:"successfull update"})
    } catch (error) {
        res.status(400).send({message:"something went wrong"})
    }
}
