const path = require("path");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");

const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");

const PORT = process.env.PORT || 3101;
dotenv.config({path: "./.env"});

// Connect to database
const db = process.env.DB.replace(
    "<password>",
    process.env.PASSWORD
);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB says hi to Clubhouse!")})

// Initialize apps and middleware
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(helmet());

// ROUTES
// 1. Website
app.use("/", viewRouter);
// 2. API
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.listen(PORT, () => {console.log(`clubhouse on ${PORT}.`)});
