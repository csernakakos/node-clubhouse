const path = require("path");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3101;
dotenv.config({path: "./.env"})

// Initialize apps and middleware
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());
app.use(compression());
app.use(helmet());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Clubhouse");
});

app.listen(PORT, () => {console.log(`clubhouse on ${PORT}.`)})
