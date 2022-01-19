const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const routes = require("../routes");
const errorHandler = require("../middlewares/error");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({
    extended: true
}));

// sanitize the request data
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options("*", cors());

// routes
app.use("/media", routes.mediaRoutes);

app.all("*", (req, res) => {
    res.sendStatus(404);
});

// error handler
app.use(errorHandler);

module.exports = app;