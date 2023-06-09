const express = require("express");
const { getAllVideos, getVideoById } = require("../controllers/videos");

const videosRouter = express.Router();

videosRouter.get("/", getAllVideos);
videosRouter.get("/:id", getVideoById);

module.exports = videosRouter;
