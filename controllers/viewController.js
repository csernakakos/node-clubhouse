const User = require("../models/userModel");
const Message = require("../models/messageModel");
const siteName = "Clubhouse";
const {validationResult} = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const get_signupForm = async (req, res) => {
    res.status(201).render("sign-up");
};

const post_signupForm = async (req, res) => {

    // console.log(req.body, "<<<<<<<<<<<<<<<<<");
    // const { isAdmin } = req.body;

    // if (isAdmin) {
    //     const obj1 = {...req.body};
    //     obj1.isAdmin = true;
    //     obj1.membershipStatus = "admin";
    //     const newUser = await User.create(obj1);
    //     req.session.userID = newUser.email;

    // } else {
    //     const newUser = await User.create(req.body);
    //     req.session.userID = newUser.email;
    // };

    // console.log("<<<<>>>>>>>>".black.bgCyan)

    // If browser sends "on"
    if (req.body.isAdmin === "on") {
        req.body.isAdmin = true;
    } else {
        req.body.isAdmin = false;
    }
    
    // Does the request contain all the necessary data?
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error("Make sure you entered a username, email, and password.")
    };

    const {username, email, password, isAdmin} = req.body;

    // Does the user already exist in our database?
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error("This email is already registered.")
    };

    // Generate password
    const salt = await bcrypt.genSalt(9);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        username,
        email,
        isAdmin,
        password: hashedPassword
    });


    res.status(201).redirect("/secret-passcode");
};

const get_secretPasscode = async (req, res) => {
 
    res.render("secret-passcode")
};

const post_secretPasscode = async (req, res) => {
    const currentUser = await User.find({"email": req.session.userID});  
    console.log(req.session, "<<<<<<<<<<<<<<<") 
    const candidateSecret = req.body.secret;

    // If wrong secret, do NOT set user to privilegedUser
    if (candidateSecret !== process.env.PASSCODESECRET) {
        req.session = {
            userID: currentUser[0]._id,
            firstName: currentUser[0].firstName,
            membershipStatus: currentUser[0].membershipStatus,
            isLoggedIn: true,
        };
        return res.status(200).redirect("home");
    };
    
    // If correct secret, set user to privilegedUser
    if (currentUser[0].membershipStatus === "user") {
        currentUser[0].membershipStatus = "privilegedUser";

        const user = await User.findByIdAndUpdate(
            currentUser[0]._id,
            { membershipStatus: currentUser[0].membershipStatus },
            {new: true, runValidators: true},
            );

            req.session = {
                firstName: user.firstName,
                membershipStatus: user.membershipStatus,
                isLoggedIn: true,
            };
        res.status(200).redirect("home")
    };

    req.session = {
        firstName: currentUser[0].firstName,
        userID: currentUser[0]._id,
        membershipStatus: currentUser[0].membershipStatus,
        isLoggedIn: true,
    };

    return res.status(200).redirect("home")

};

const get_loginForm = async (req, res) => {
    res.status(200).render("log-in", {title: `Log in | ${siteName}`});
};

const post_loginForm = async (req, res) => {
    const {email, password} = req.body;

    // If no email or password was provided:
    if (!email || !password) {
        return res.status(400).json({
            status: "failure",
            error: "Please provide both the email and the password!"
        })
    };

    const user = await User.findOne({email}).select("+password");

    // if user doesn't exist or passwords don't match:
    if (!user || !(await user.isCorrectPassword(password, user.password))) {
        return res.status(400).json({
            status: "failure",
            error: "This user doesn't exist, or the password you entered is wrong."
        })
    };

    // If logging in is successful, redirect to /home with user data:
    req.session.userID = user._id;
    console.log(req.session.userID, "currently logged in");
    // Forward data to other routes via req.session:
    req.session = {
        userID: user._id,
        firstName: user.firstName,
        membershipStatus: user.membershipStatus,
        isLoggedIn: true,
    };

    res.status(200).redirect("home");
};

const get_logOut = async (req, res) => {
    req.session = null;
    res.status(200).redirect("home");
}

const get_newMessage = async (req, res) => {
    const {firstName, membershipStatus, isLoggedIn} = req.session;
    res.status(200).render("new-message", {
        title: `Post a message | ${siteName}`,
        firstName,
        membershipStatus,
        isLoggedIn,
    });
}

const post_newMessage = async (req, res) => {

    const currentUser = await User.find({"email": req.session.userID})
    // console.log(req.session.userID, "<<<< posted by");
    const createdBy = await User.findById(req.session.userID)
    console.log(">>>>>>>>>>>>>>>>>>")
    console.log(currentUser);
    console.log(req.session);
    console.log(createdBy);
    console.log(req.session.userID, "<<<<<<<<posted by")
    console.log(createdBy.firstName, "<<<<<<<<<< createdBy");
    
    const message = new Message({
        createdBy: createdBy,
        title: req.body.title,
        body: req.body.body,
    });

    message.save();

    res.status(201).redirect("home");
};

// GET HOME PAGE
const home = async (req, res) => {
    console.log("HOME!")

    if (!req.session) {
        res.status(200).render("home", {
            title: `Welcome | ${siteName}`,
        })
    };

    // Receive req.session
    console.log(req.session);
    const {firstName, membershipStatus, isLoggedIn} = req.session;

    // Get all messages + populate each with their respective user:
    const messages = await Message.find().populate("createdBy");

    console.log(messages, "<<<<<<<<<<<<<");
  
    res.status(200).render("home", {
        title: `Welcome | ${siteName}`,
        firstName,
        membershipStatus,
        isLoggedIn,
        messages,
    });
};

const delete_message = async (req, res) => {
    const message = await Message.findOneAndDelete(req.params.id);
    res.status(200).redirect("/home");
}

module.exports = {
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
}