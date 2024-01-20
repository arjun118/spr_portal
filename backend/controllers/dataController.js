require("dotenv").config({ path: "../../.env" });
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

const dbConn = getDB(process.env.DB_NAME);

const getData = async (req, res) => {
  const { type = "" } = req.query;
  let data;
  if (type !== "") {
    data = await dbConn.collection("data").find({ type }).toArray();
  } else {
    data = await dbConn.collection("data").find().toArray();
  }
  return res.json({ success: true, data });
};

const postData = async (req, res) => {
  const { company, date, time, mode_of_test, tentative, type } = req.body;
  await dbConn.collection("data").insertOne({
    company,
    date,
    time,
    mode_of_test,
    tentative,
    type,
  });
  return res.json({ success: true });
};

const editData = async (req, res) => {
  const { _id, ...restData } = req.body;
  let objID = new ObjectId(_id);
  const response = await dbConn.collection("data").updateOne(
    {
      _id: objID,
    },
    { $set: { ...restData } }
  );
  return res.json({ success: true });
};

const deleteData = async (req, res) => {
  let { objID } = req.body;
  objID = new ObjectId(objID);
  const response = await dbConn.collection("data").deleteOne({
    _id: objID,
  });
  return res.json({ success: true });
};
module.exports = { getData, postData, deleteData, editData };
