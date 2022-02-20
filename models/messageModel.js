const mongoose = require("mongoose");
const User = require("./userModel");

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
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

messageSchema.pre("save", async function(next){
    console.log(this, "BEFORE SAVING");
    this.timestamp2 = "AKOS";
    console.log(this);
    next();
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;