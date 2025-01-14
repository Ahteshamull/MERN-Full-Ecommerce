const bcrypt = require("bcrypt");
const EmailValidateCheck = require("../helpers/EmailvalidateChack");
const userModel = require("../model/userModel");


const userSignup = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      if (!name) {
         return res.status(404).send({ error: " Name is required" });
      }
      if (!email) {
          return res.status(404).send({ error: " Email is required" });
      }
      if (!password) {
        return res.status(404).send({ error: " Password is required" });
      }

    if (!EmailValidateCheck(email)) {
      return res.status(404).send({ error: " Email Must Be Valid" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(404).send({ error: "Email Already In Use" });
    }
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          const user = new userModel({
            name,
            email,
            password: hash,
          });
          await user.save();
          return res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: user,
          });
        }
      });
    } catch (error) {
      return res.status(404).send({ error });
    }
  } catch (error) {
    res.status(501).send({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
module.exports = userSignup;
