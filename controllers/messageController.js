const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.get_messages = async (req, res) => {
    const messages = await Message.find();

    res.status(200).json({
        status: "success",
        results: messages.length,
        data: {
            data: messages
        }
    })
}

exports.create_message = async (req, res) => {
    const newMessage = await Message.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: newMessage
        }
    })
}