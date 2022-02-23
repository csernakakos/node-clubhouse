const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    membershipStatus: {
        type: String,
        enum: ["user", "privilegedUser", "admin",],
        default: "user",
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


// Hash and salt password before saving document to the database:
// userSchema.pre("save", async function(next){

//     const salt = crypto.randomBytes(9).toString("hex");
//     const hashedBuff = await scrypt(this.password, salt, 64);
//     this.password = `${hashedBuff.toString("hex")}-${salt}`;
    
//     next();
// });


// Create virtual property which will not be stored in database:
// userSchema.virtual("name").get(function(){
//     let fullName = "";
//     if (this.firstName && this.lastName) fullName = `${this.firstName} ${this.lastName}`
//     if (!this.firstName || !this.lastName) fullName = "";
//     return fullName;
// });

// Compare two passwords function
// userSchema.methods.isCorrectPassword = async function(candidatePassword, userPassword){
//     const result = userPassword.split("-");
//     const hashed = result[0];
//     const salt = result[1];

//     const BUFFencryptedCandidatePassword = await scrypt(candidatePassword, salt, 64);
//     const encryptedCandidatePassword = BUFFencryptedCandidatePassword.toString("hex");

//     return hashed === encryptedCandidatePassword;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;