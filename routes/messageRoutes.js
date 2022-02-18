const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.get_messages);
router.post("/new-message", messageController.create_message)

module.exports = router;