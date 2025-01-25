const express = require("express");
const userSignup = require("../controller/userSignup");
const multer = require("multer");
const path = require("path");
const userLogin = require("../controller/userSignIn");
const {
  loginValidation,
  signUpValidation,
} = require("../middleware/authMiddleware");
const userDetails = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new error("Only jpeg, jpg,or png file allowed"));
    }
  },
});
function errorCheck(err, req, res, next) {
  if (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
}

const router = express.Router();
router.post(
  "/signup",
  upload.single("image"),
  errorCheck,
  signUpValidation,
  userSignup
);
router.post("/login", loginValidation, userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/user-logout", userLogout);
router.get("/all-users", authToken, allUsers);

module.exports = router;
