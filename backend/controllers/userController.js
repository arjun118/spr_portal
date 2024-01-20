require("dotenv").config({ path: "../../.env" });
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const dbConn = getDB(process.env.DB_NAME);
const jwt = require("jsonwebtoken");
const addUser = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await dbConn.collection("users").findOne({
    email: email,
  });
  if (user) {
    return res.json({
      success: false,
      msg: "User already exists with this email id",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await dbConn.collection("users").insertOne({
      email,
      password: hash,
      role,
    });
    return res.json({ success: true });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.cookie("dummy", "somevalue");
  // console.dir(res);
  return res.json({ success: "true", dummy: "ok" });
};

module.exports = { addUser, loginUser };
