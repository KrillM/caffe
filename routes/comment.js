const express = require("express");
const router = express.Router();
const comment = require("../controller/CComment")

router.post("/create", comment.createComment); 

module.exports=router;