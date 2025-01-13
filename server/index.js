const express = require("express");
const dbConnect = require("./config/dbConfig");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
dbConnect()
app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(process.env.PORT || 8080, () => {
  console.log("Server Is Running");
});
