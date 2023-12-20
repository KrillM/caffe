const express = require("express");
const router = express.Router();
const write = require("../controller/CWrite")

router.get("/", write.writePage);
router.post("/", write.writePage);
router.post("/create", write.createReview);

router.get("/update/:reviewId", write.updateReviewPage);
router.post("/update/:reviewId", write.updateReviewPage);

router.delete("/delete/:reviewId", write.deleteReview);

module.exports=router;