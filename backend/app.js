// require("dotenv").config();
const express = require("express");
const todoRoute = require("./routes/todoRoute");
const connectToDB = require("./config/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.use("/", todoRoute);
module.exports = app;
