const express = require("express");
const router = express.Router();
const crew = require("../controller/Ccrew");

// 홈페이지
router.get("/", crew.homePage);
router.get("/signup", crew.signUpPage);
router.get("/login", crew.loginPage);

module.exports=router;