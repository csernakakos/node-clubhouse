const User = require("../models/userModel");

exports.get_users = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            data: users
        }
    })
};

exports.signup_user = async (req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newUser
        }
    })
};

exports.login_user = async (req, res) => {
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
    
}

exports.enter_secret_passcode_user = async(req, res) => {
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
}

exports.logout_user = async (req, res) => {
    req.session = null;
    res.status(200).json({
        status: "success",
        session: req.session,
        data: {
            loggedOut: true,
        }
    })
}