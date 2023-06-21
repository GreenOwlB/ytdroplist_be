const express = require("express");
const cors = require("cors");
require("dotenv").config();

const videosRouter = require("./routes/videos");
const ytRouter = require("./routes/yt");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.get("/", (req, res) => {
  res.send("connected");
});

app.use("/videos", videosRouter);
app.use("/yt", ytRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
