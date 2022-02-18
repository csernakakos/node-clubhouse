const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.get_users);
router.post("/sign-up", userController.signup_user)
router.post("/log-in", userController.login_user)
router.post("/log-out", userController.logout_user)

module.exports = router;