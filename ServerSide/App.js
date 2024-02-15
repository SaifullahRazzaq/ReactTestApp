require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
app.use(express.json());
app.use("/api/v1/user", require('./Api/Auth'));
module.exports = app;