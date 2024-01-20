const express = require("express");
const userRouter = express.Router();
const { addUser, loginUser } = require("../controllers/userController");

userRouter.post("/login", loginUser);
userRouter.post("/adduser", addUser);

module.exports = userRouter;
