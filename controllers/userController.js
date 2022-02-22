const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const get_users = asyncHandler(async(req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            data: users
        }
    })
});

// @desc    Create a user
// @route   POST /api/users/sign-up
// @access  Public
const signup_user = asyncHandler(async(req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newUser
        }
    })
});

// @desc    Give user privilegedUser rights
// @route   POST /api/users/secret-passcode
// @access  Private
const enter_secret_passcode_user = asyncHandler(async(req, res) => {
    const candidateSecret = req.body.secret;

    if (candidateSecret !== process.env.PASSCODESECRET) {
        return res.status(200).json({
            status: "success",
            msg: "you are NOT a privilegedUser."
        })
    };

    res.status(200).json({
        status: "success",
        msg: "you are now a privilegedUser."
    })
});

// @desc    Authenticate user
// @route   POST /api/users/log-in
// @access  Public
const login_user = asyncHandler(async(req, res) => {
    // console.log("POOOOOOOOOOST")
    const {email, password} = req.body;

    // If no email or password was provided:
    if (!email || !password) {
        return res.status(400).json({
            status: "failure",
            error: "Please provide the email and the password!"
        })
    };

    const user = await User.findOne({email}).select("+password");

    console.log(user);

    // if user doesn't exist or passwords don't match:
    if (!user || !(await user.isCorrectPassword(password, user.password))) {
        return res.status(400).json({
            status: "failure",
            error: "This user doesn't exist, or the password you entered is wrong."
        })
    };

    req.session.cookieProperty = user.firstName;

    res.status(200).json({
        status: "success",
        session: req.session,
        msg: "You've successfully logged in.",
    });
    
});

// @desc    Log user out
// @route   POST /api/users/log-out
// @access  Private
const logout_user = asyncHandler(async(req, res) => {
    req.session = null;
    res.status(200).json({
        status: "success",
        session: req.session,
        data: {
            loggedOut: true,
        }
    })
});


module.exports = {
    get_users,
    signup_user,
    enter_secret_passcode_user,
    login_user,
    logout_user,
}