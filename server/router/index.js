
const express = require("express")
const userSignup = require("../controller/userSignup")

const router = express.Router()
router.post("/signup",userSignup)

module.exports = router