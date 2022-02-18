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

exports.create_user = async (req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newUser
        }
    })
};