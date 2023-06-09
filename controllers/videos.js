const pool = require("../dbh");

const getAllVideos = async (req, res) => {
  const sql = "SELECT * FROM videos";

  try {
    const [rows, fields] = await pool.query(sql);
    if (rows[0]) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({
        message: "no data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "db error",
    });
  }
};

const getVideoById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM videos WHERE id = ?";
  const values = [id];

  try {
    const [rows, fields] = await pool.query(sql, values);
    if (rows[0]) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({
        message: "no data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "db error",
    });
  }
};

module.exports = { getAllVideos, getVideoById };
