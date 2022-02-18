const User = require("../models/userModel");

exports.home = async (req, res) => {
    const user = await User.findOne();
  
    // Example cookie response. To be reworked later with signup and login and logout
    req.session.cookieProperty = user.lastName;
    res.send("Welcome to Clubhouse");
}