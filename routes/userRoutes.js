const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        1: {
            firstName: "akos",
            lastName: "csernak",
            username: "acs",
            password: "HASH-n-SALT",
            membershipStatus: ["user, privilegedUser, admin"],
            isAdmin: true,
        }
    });
})

module.exports = router;