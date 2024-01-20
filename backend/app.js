require("dotenv").config();
const express = require("express");
const app = express();
const { connectDB, getDB } = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const dataRouter = require("./routes/dataRouter");
const userRouter = require("./routes/userRouter");

app.use(cookieParser("somesecret"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use("/api/data", dataRouter);
app.use("/api/user", userRouter);

app.get("/setcookie", (req, res) => {
  res.cookie("dummy", "somevalue", { signed: true });
  return res.status(200).json("cookie");
});

app.get("/getcookie", (req, res) => {
  const cookies = req.signedCookies;
  return res.json({ cookies });
});
connectDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log("Server started listening");
    });
  })
  .catch((e) => {
    console.log("Error occured", e);
  });
