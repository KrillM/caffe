const express=require("express");
const router = express.Router();
const home = require("../controller/Chome");

// 홈페이지
router.get("/", home.homePage);

module.exports=router;