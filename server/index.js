const router = require("./router");
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
dbConnect();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", router);

app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(process.env.PORT || 8080, () => {
  console.log("Server Is Running");
});
