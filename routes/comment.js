const express = require("express");
const router = express.Router();
const comment = require("../controller/CComment")

router.post("/create", comment.createComment); 
router.delete("/delete/:commentId", comment.deleteComment);

module.exports=router;