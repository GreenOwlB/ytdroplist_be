const express = require("express");
const {
  getAllVideos,
  getVideoById,
  addNewVideo,
  deleteVideo,
  updateVideo,
} = require("../controllers/videos");

const videosRouter = express.Router();

videosRouter.get("/", getAllVideos);
videosRouter.get("/:id", getVideoById);
videosRouter.post("/", addNewVideo);
videosRouter.patch("/:id", updateVideo);
videosRouter.delete("/:id", deleteVideo);

module.exports = videosRouter;
