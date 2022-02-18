const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 100,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100
    },
    // Have to validate, sanitize, store safely email and password. --->
    email: {type: String, required: true},
    password: {type: String, required: true},
    // <---
    membershipStatus: {
        type: String,
        enum: ["user", "privilegedUser",],
        default: "user",
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.virtual("name").get(function(){
    let fullName = "";
    if (this.firstName && this.lastName) fullName = `${this.firstName} ${this.lastName}`
    if (!this.firstName || !this.lastName) fullName = "";
    return fullName;
})


const User = mongoose.model("User", userSchema);

module.exports = User;