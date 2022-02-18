const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.get_users);
router.post("/new-user", userController.create_user)

module.exports = router;