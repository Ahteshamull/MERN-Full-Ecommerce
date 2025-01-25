const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Get the token from cookies or headers
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // If no token is provided
    if (!token) {
      return res.status(401).send({
        message: "User not authenticated",
        error: true,
        success: false,
        data: [],
      });
    }

    // Verify the token
    jwt.verify(token, process.env.PRV_TOKEN, (err, decoded) => {
      if (err) {
        console.log("Token verification error", err);
        return res.status(401).send({
          message: "Invalid or expired token",
          error: true,
          success: false,
          data: [],
        });
      }

      // If token is valid, store user information in request object
      console.log(decoded)
      const userId = decoded._id;
     
      req.userId = userId;

      // Proceed to next middleware
      next();
    });
  } catch (error) {
    
    res.status(400).send({
      message: error.message || "Error during token authentication",
      error: true,
      success: false,
      data: [],
    });
  }
}

module.exports = authToken;
