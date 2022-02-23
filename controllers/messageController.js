const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const get_messages = asyncHandler(async(req, res) => {
    let messages;
    // If user is not a privilegedUser, don't send certain message fields to the client:
    if (!req.user || req.user.membershipStatus !== "privilegedUser") {
        console.log("NOCRED");
        messages = await Message.find().select("-createdAt -updatedAt -createdBy");
        console.log(messages);
    } else {
        console.log("privilegedUser")
        messages = await Message.find();
    }

    res.status(200).json({
        status: "success",
        results: messages.length,
        data: {
            messages
        }
    })
});

// @desc    Create a message
// @route   POST /api/messages
// @access  Private
const create_message = asyncHandler(async(req, res) => {

    // If there is no message title or body, throw an error:
    if (!req.body.title || !req.body.body) {
        res.status(400);
        throw new Error("Add a message title and body text.");
    }

    const {title, body} = req.body;

    // Create message and save it to the database
    const message = await Message.create({
        title,
        body,
        // user
    });

    res.status(201).json({
        status: "success",
        data: {
            message
        }
    })
});


// @desc    Delete a message
// @route   DELETE /api/messages/:messageID
// @access  Private
const delete_message = asyncHandler(async(req, res) => {
    console.log("DELETE")
    const message = await Message.findById(req.params.messageID);

    if(!message) {
        res.status(400)
        throw new Error("No such message.")
    };
    console.log("++++++++++++++++", message);

    console.log("REQ.USER", req.user._id);
    const user = await User.findById(req.user._id);

    if(!user) {
        res.status(401)
        throw new Error("No such user.")
    }

    console.log("USER", user)

    if(!user.isAdmin) {
        res.status(403)
        throw new Error("You cannot perform this action.")
    }

    await message.remove();

    res.status(200).json({
        status: "success",
        note: `deleted message ${message._id}`
    });



});

module.exports = {
    get_messages,
    create_message,
    delete_message,
}