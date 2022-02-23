const express = require("express");
const router = express.Router();
const {
    home,
    delete_message,
    get_signupForm,
    post_signupForm,
    get_secretPasscode,
    post_secretPasscode,
    get_loginForm,
    post_loginForm,
    get_logOut,
    get_newMessage,
    post_newMessage,
} = require("../controllers/viewController");


function LOG(req, res, next){
    console.log("LOG".bgYellow);
    next();
}

router.get("/", (req, res) => {res.redirect("/home")});
router.get("/home", home);
router.post("/delete-message/:id", delete_message);

router.get("/sign-up", get_signupForm);
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
post_signupForm);

router.get("/secret-passcode", get_secretPasscode);
router.post("/secret-passcode", post_secretPasscode);

router.get("/log-in", get_loginForm);
router.post("/log-in", post_loginForm);


router.get("/log-out", get_logOut);

router.get("/new-message", get_newMessage);
router.post("/new-message", post_newMessage);


module.exports = router;