const userModel = require("../model/userModel");

async function allUsers(req, res) {
  try {
    const allUsers = await userModel.find();

    res.send({
      message: "All Users ",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
