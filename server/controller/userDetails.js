const userModel = require("../model/userModel");

async function userDetails(req, res) {
  try {
   const user = await userModel.findById(req.userId);
    res.status(200).send({ message: "User details", success: true, data: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message || err, error: true, success: false });
  }
}
module.exports = userDetails;