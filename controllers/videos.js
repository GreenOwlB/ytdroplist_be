const pool = require("../dbh");
const { getUpdatedFields, trimFields } = require("../utilities/helpers");

const getAllVideos = async (req, res) => {
  const sql =
    "SELECT id, yt_id, title, channel, DATE_FORMAT(date_published, '%d-%m-%Y') AS date_published, description, thumbnail_df, thumbnail_md FROM videos";

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
  const sql =
    "SELECT id, yt_id, title, channel, DATE_FORMAT(date_published, '%d-%m-%Y') AS date_published, description, thumbnail_df, thumbnail_md FROM videos WHERE id = ?";
  const values = [id];

  try {
    const [rows, fields] = await pool.query(sql, values);
    if (rows[0]) {
      console.log(rows[0].date_published);
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

const addNewVideo = async (req, res) => {
  // const { title, channel, date_published, description } = req.body;
  const { title, channel, date_published, description } = trimFields(req);
  const sql =
    "INSERT INTO videos (title, channel, date_published, description) values (?,?,?,?)";
  const values = [title, channel, date_published, description];

  try {
    const [results, fields] = await pool.query(sql, values);
    if (results.insertId) {
      res.status(200).json({
        newId: results.insertId,
      });
    } else {
      res.status(200).json({
        message: "no insert",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "db error",
    });
  }
};

const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM videos WHERE id = ?";
  const values = [id];

  try {
    const [results, fields] = await pool.query(sql, values);
    if (results.affectedRows) {
      res.status(200).json({
        deleted: true,
      });
    } else {
      res.status(200).json({
        deleted: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "db error",
    });
  }
};

const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { fields, values } = getUpdatedFields(req);
  values.push(id);

  const sql = `UPDATE videos SET ${fields}  WHERE id=?`;

  try {
    const [results, fields] = await pool.query(sql, values);
    if (results.affectedRows) {
      res.status(200).json({
        updated: true,
      });
    } else {
      res.status(200).json({
        updated: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "db error",
    });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  addNewVideo,
  deleteVideo,
  updateVideo,
};
