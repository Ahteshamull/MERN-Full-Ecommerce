const userModel = require("../model/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, name, email, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);

    const UpdateUser = await userModel.findByIdAndUpdate(userId, payload);
    return res.status(201).send({
      success: true,
      message: "User Update Successfully",
      error: false,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = updateUser;
