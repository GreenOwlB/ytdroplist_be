const axios = require("axios");
require("dotenv").config();
const pool = require("../dbh");
const apiKey = process.env.API_KEY;
const baseUrl = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet";

const getAndSaveYtData = async (req, res) => {
  const { yt_id } = req.body;
  const url = `${baseUrl}&id=${yt_id}&key=${apiKey}`;
  try {
    const result = await axios.get(url);
    const snippet = result.data.items[0].snippet;
    const saveArray = createSaveArray(yt_id, snippet);
    const saveResults = await saveData(saveArray);
    console.log(saveResults);
    if (saveResults.insertId) {
      res.status(200).json(saveResults.insertId);
    } else {
      res.status(500).json("can't retrieve or save data");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("error while getting or saving data");
  }
};

const createSaveArray = (id, snippet) => {
  const saveArray = [
    id,
    snippet.channelTitle,
    snippet.title,
    snippet.publishedAt,
    snippet.description,
    snippet.thumbnails.default.url,
    snippet.thumbnails.medium.url,
  ];
  return saveArray;
};

const saveData = async (saveArray) => {
  const sql =
    "INSERT INTO videos (yt_id, channel, title, date_published, description, thumbnail_df, thumbnail_md) VALUES (?,?,?,?,?,?,?)";
  try {
    const [results, fields] = await pool.query(sql, saveArray);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { getAndSaveYtData };
