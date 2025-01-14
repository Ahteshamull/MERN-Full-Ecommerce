const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        if (existingUser.role === "user") {
          let loginUserInfo = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };

          const token = jwt.sign({ loginUserInfo }, process.env.PRV_TOKEN, {
            expiresIn: "24h",
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          });
          return res.status(200).send({
            success: "User Login Successfully",
            data: loginUserInfo,
            token,
          });
        } else if (existingUser.role === "admin") {
          let loginUserInfo = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };

          const token = jwt.sign({ loginUserInfo }, process.env.PRV_TOKEN, {
            expiresIn: "5m",
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          });
          return res.status(200).send({
            success: "Admin Login Successfully",
            data: loginUserInfo,
            token,
          });
        }
      } else {
        return res.status(404).send({ error: "Invalid Email or Password" });
      }
    });
  } else {
    return res.status(404).send({ error: "You Have Don't Any Account" });
  }
};

module.exports = userLogin;
