const mongoose = require("mongoose");
const User = require("./userModel");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a message title."],
        default: "My Message Title",
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        min: "2022-01-01",
    },
    body: {
        type: String,
        required: [true, "Please enter a message text."],
        default: "My message...",
    },
    createdBy: {type: Schema.Types.ObjectId, ref: "User"},
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;