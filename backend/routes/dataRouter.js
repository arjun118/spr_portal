const express = require("express");
const {
  getData,
  postData,
  deleteData,
  editData,
} = require("../controllers/dataController");
const dataRouter = express.Router();

dataRouter.get("/", getData);
dataRouter.post("/new", postData);
dataRouter.put("/edit", editData);
dataRouter.delete("/delete", deleteData);

module.exports = dataRouter;
