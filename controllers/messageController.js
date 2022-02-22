const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public
const get_messages = asyncHandler(async(req, res) => {
    const messages = await Message.find();

    res.status(200).json({
        status: "success",
        results: messages.length,
        data: {
            data: messages
        }
    })
});

// @desc    Create a message
// @route   POST /api/messages
// @access  Private
const create_message = asyncHandler(async(req, res) => {
    const newMessage = await Message.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: newMessage
        }
    })
});

module.exports = {
    get_messages,
    create_message
}