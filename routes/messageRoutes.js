const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        1: {
            title: "first msg",
            timestamp: JSON.stringify(new Date()),
            body: "my secret message........",
            createdBy: "USER!!!",
        }
    });
})

module.exports = router;