const express = require("express");
const router = express.Router();
const {get_messages, create_message, delete_message} = require("../controllers/messageController");
const {optionallyProtectWithToken, protectWithToken} = require("../config/authHandler");


function LOG(req, res, next){
    console.log("LOG");
    next();
}

router
    .route("/")
    .get(optionallyProtectWithToken, get_messages)
    .post(protectWithToken, create_message);

router.route("/:messageID")
    .delete(LOG, protectWithToken, delete_message)

module.exports = router;