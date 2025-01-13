const { default: mongoose } = require("mongoose");

let dbConnect = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Database Connected......");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
