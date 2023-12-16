const express = require("express");
const router = express.Router();
const crew = require("../controller/CCrew")

router.get("/:nickname", crew.profilePage);
router.post("/:nickname", crew.profilePage);
router.patch("/update/profile", crew.updateProfile);
router.patch("/update/password", crew.updatePassword);
router.patch("/update/image", crew.updateImage);
router.delete("/delete", crew.profileDelete);

module.exports=router;