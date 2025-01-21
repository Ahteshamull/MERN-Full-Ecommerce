const bcrypt = require("bcrypt");
const EmailValidateCheck = require("../helpers/EmailvalidateChack");
const userModel = require("../model/userModel");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  

    // Validate email format
    if (!EmailValidateCheck(email)) {
      return res.status(400).send({ message: "Email must be valid" ,success:false });
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already in use", success: false });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);
    const filePath = process.env.BASE_URL;

    // Check for image file in req.file
    const image = req.file ? filePath + req.file.filename : null;

    // Create the new user
    const user = new userModel({
      name,
      email,
      role: "GENERAL",
      password: hash,
      image, // Only save image if it's provided, else null.
    });

    // Save user to database
    await user.save();

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error during user creation:", error); // More detailed error logging

    // Handle different types of errors
    if (error.code === 11000) {
      // Duplicate key error, like email already exists in DB
      return res.status(400).send({
        message: "Email already exists. Please use a different one.",
        success: false,
      });
    }

    // General error response
    return res.status(500).send({
      message: "Internal Server Error",
    
      success: false,
    });
  }
};

module.exports = userSignup;
