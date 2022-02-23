const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a message title."],
    },
    body: {
        type: String,
        required: [true, "Please enter a message text."],
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;