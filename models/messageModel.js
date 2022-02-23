const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a message title."],
        minLength: [2, "Minimum 2 characters."],
        maxLength: [40, "Maximum 40 characters."],
        trim: true,
    },
    body: {
        type: String,
        required: [true, "Please enter a message text."],
        minLength: [2, "Minimum 2 characters."],
        maxLength: [300, "Maximum 200 characters."],
        trim: true,
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;