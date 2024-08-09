const express = require("express")
const router = express.Router()
const itemsController = require("../controllers/itemsController")
const authenticationMiddleware = require("../middleware/authentication")

router.get("/", itemsController.getItems)
router.post("/", authenticationMiddleware, itemsController.addItems)
router.patch("/", authenticationMiddleware, itemsController.updateItem)
router.patch("/bulkUpdate", itemsController.updateInBulk)

module.exports = router