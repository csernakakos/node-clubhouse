const mongoose = require("mongoose");
const crypto = require("crypto"); // SALT
const util = require("util");
const scrypt = util.promisify(crypto.scrypt); // HASH

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
    password: {type: String, required: true, select: false,},
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


// Hash and salt password before saving document to the database:
userSchema.pre("save", async function(next){
    console.log(this, "before saving");

    const salt = crypto.randomBytes(9).toString("hex");
    const hashedBuff = await scrypt(this.password, salt, 64);
    this.password = `${hashedBuff.toString("hex")}-${salt}`;
    
    next();
});


// Create virtual property which will not be stored in database:
userSchema.virtual("name").get(function(){
    let fullName = "";
    if (this.firstName && this.lastName) fullName = `${this.firstName} ${this.lastName}`
    if (!this.firstName || !this.lastName) fullName = "";
    return fullName;
});

// Compare two passwords function
userSchema.methods.isCorrectPassword = async function(candidatePassword, userPassword){
    // return await bcrypt.compare(candidatePassword, userPassword);

    const result = userPassword.split("-");
    const hashed = result[0];
    const salt = result[1];
    // Destructuring way: const [hashed, salt] = userPassword.split("-");

    const BUFFencryptedCandidatePassword = await scrypt(candidatePassword, salt, 64);
    const encryptedCandidatePassword = BUFFencryptedCandidatePassword.toString("hex");

    return hashed === encryptedCandidatePassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;