const express = require("express");
const { getAndSaveYtData } = require("../controllers/yt");

const ytRouter = express.Router();

ytRouter.post("/", getAndSaveYtData);

module.exports = ytRouter;
