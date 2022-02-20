const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const { check, validateEmail } = require("express-validator");

router.get("/", (req, res) => {res.redirect("/home")});
router.get("/home", viewController.home);
router.post("/delete-message/:id", viewController.delete_message);

router.get("/sign-up", viewController.get_signupForm);
router.post("/sign-up", 
    // [
    // check("email")
    //     .trim()
    //     .normalizeEmail()
    //     .isEmail()
    //     .withMessage("This is not a valid email.")
    //     .custom(async (email) => {
    //         const existingUser = await User.find({"email": email});
    //         if (existingUser) {
    //             throw new Error("This email is already in use.");
    //         } 
    //     }),
    // check("password")
    //     .trim()
    //     .isLength({min:4, max:20})
    //     .withMessage("Make sure the password is between 4 and 20 characters."),
    // check("passwordConfirmation")
    //     .trim()
    //     .isLength({min:4, max:20})
    //     .withMessage("Make sure the password is between 4 and 20 characters.")
    //     .custom((passwordConfirmation, {req}) => {
    //         if (passwordConfirmation !== req.body.password) {
    //             throw new Error("The two passwords don't match.")
    //         }
    //     }),
    // ], 
viewController.post_signupForm);

router.get("/secret-passcode", viewController.get_secretPasscode);
router.post("/secret-passcode", viewController.post_secretPasscode);

router.get("/log-in", viewController.get_loginForm);
router.post("/log-in", viewController.post_loginForm);

router.get("/log-out", viewController.get_logOut);

router.get("/new-message", viewController.get_newMessage);
router.post("/new-message", viewController.post_newMessage);


module.exports = router;