const express = require("express");
const userSignup = require("../controller/userSignup");

const userLogin = require("../controller/userSignIn");
const {
  loginValidation,
  signUpValidation,
} = require("../middleware/authMiddleware");
const userDetails = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const { errorCheck, upload } = require("../middleware/ImageMiddleware");
const updateUser = require("../controller/updateUserRole");
const UploadProduct = require("../controller/uploadProduct");
const { getProduct } = require("../controller/getAllProducts");
const updateProduct = require("../controller/updateProduct");

const router = express.Router();
router.post(
  "/signup",
  upload.single("image"),
  errorCheck,
  signUpValidation,
  userSignup
);

// ===============auth===============//
router.post("/login", loginValidation, userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/user-logout", userLogout);
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// ===============Product=================//
router.post("/upload/product", authToken, UploadProduct);
router.get("/all/products", getProduct);
router.post("/update/products",authToken, updateProduct);

module.exports = router;
