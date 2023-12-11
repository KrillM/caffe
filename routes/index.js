const express = require("express");
const router = express.Router();
const home = require("../controller/CHome");

// 홈페이지
router.get("/", home.homePage);
router.get("/signup", home.signUpPage);
router.get("/login", home.loginPage);

module.exports=router;