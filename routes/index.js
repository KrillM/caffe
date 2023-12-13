const express = require("express");
const router = express.Router();
const crew = require("../controller/CCrew")

router.get("/", crew.homePage);
router.get("/signup", crew.signUpPage);
router.post("/signup", crew.signUpProcess);

router.get("/login", crew.loginPage);
router.post("/login", crew.loginProcess);
router.delete("/logout", crew.logoutProcess);

module.exports=router;