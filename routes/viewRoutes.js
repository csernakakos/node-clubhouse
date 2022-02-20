const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const { validateEmail } = require("../controllers/validators");

router.get("/", (req, res) => {res.redirect("/home")});
router.get("/home", viewController.home);
router.post("/delete-message/:id", viewController.delete_message);

router.get("/sign-up", viewController.get_signupForm);
router.post("/sign-up", validateEmail, viewController.post_signupForm);

router.get("/secret-passcode", viewController.get_secretPasscode);
router.post("/secret-passcode", viewController.post_secretPasscode);

router.get("/log-in", viewController.get_loginForm);
router.post("/log-in", viewController.post_loginForm);

router.get("/log-out", viewController.get_logOut);

router.get("/new-message", viewController.get_newMessage);
router.post("/new-message", viewController.post_newMessage);


module.exports = router;