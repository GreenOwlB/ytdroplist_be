const express = require("express");
require("dotenv").config();

const videosRouter = require("./routes/videos");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("connected");
});

app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
