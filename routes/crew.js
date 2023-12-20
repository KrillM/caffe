const express = require("express");
const router = express.Router();
const login = require("../controller/CLogin")
const crew = require("../controller/CCrew")
const crewpage = require("../controller/CPage")

router.get("/", login.homePage);
router.get("/signup", crew.signUpPage);
router.post("/signup", crew.signUpProcess);

router.get("/login", login.loginPage);
router.post("/login", login.loginProcess);
router.delete("/logout", login.logoutProcess);

router.get("/crewpage/:nickname", crewpage.crewPage);
router.get("/review/:reviewId", crewpage.readReviewPage);

module.exports=router;