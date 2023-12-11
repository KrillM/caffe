const express = require("express");
const router = express.Router();
const crew = require("../controller/CCrew")

// 홈페이지
router.get("/", crew.homePage);
router.get("/signup", crew.signUpPage);
router.post("/signup", crew.signUpProcess);
router.get("/login", crew.loginPage);

module.exports=router;