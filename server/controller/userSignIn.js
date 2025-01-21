const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email) {
    return res
      .status(404)
      .send({ message: "Email is required", success: false });
  }
  if (!password) {
    return res
      .status(404)
      .send({ message: "Password is required", success: false });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    // Check if the user exists
    if (!existingUser) {
      return res
        .status(404)
        .send({ message: "You don't have an account", success: false });
    }

    // Compare passwords asynchronously using bcrypt.compare
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      const loginUserInfo = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      };

      // Set token expiration based on role
      const tokenExpiry = existingUser.role === "ADMIN" ? "5m" : "24h";
      const token = jwt.sign({ loginUserInfo }, process.env.PRV_TOKEN, {
        expiresIn: tokenExpiry,
      });

      // Send the token as a secure HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      });

      return res.status(200).send({
        message: `${existingUser.role} Login Successfully`,
        success: true,
        data: loginUserInfo,
        token,
      });
    } else {
      return res
        .status(404)
        .send({ message: "Invalid Email or Password", success: false });
    }
  } catch (error) {
    // Handle errors during the process
    console.error("Error during login:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = userLogin;
