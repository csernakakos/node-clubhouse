const express = require("express");
const router = express.Router();
const {get_messages, create_message} = require("../controllers/messageController");

router
    .route("/")
    .get(get_messages)
    .post(create_message);

// router.route("/new-message")
//     .post(create_message)

module.exports = router;