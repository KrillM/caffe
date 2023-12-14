const express = require("express");
const router = express.Router();
const login = require("../controller/CLogin")
const crew = require("../controller/CCrew")

router.get("/", login.homePage);
router.get("/signup", crew.signUpPage);
router.post("/signup", crew.signUpProcess);

router.get("/login", login.loginPage);
router.post("/login", login.loginProcess);
router.delete("/logout", login.logoutProcess);

router.get("/myinfo/:nickname", crew.profilePage);
router.post("/myinfo/:nickname", crew.profilePage);
router.delete("/myinfo/delete", crew.profileDelete);

module.exports=router;