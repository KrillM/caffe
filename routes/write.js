const express = require("express");
const router = express.Router();
const write = require("../controller/CWrite")

router.get("/", write.writePage);
router.post("/", write.writePage);
router.post("/create", write.createReview);

router.get("/update/:reviewId", write.updateReviewPage);
router.post("/update/:reviewId", write.updateReviewPage);
router.patch("/update/image/:reviewId", write.updateReviewImage);
router.patch("/update/content/:reviewId", write.updateReviewContent);
router.delete("/delete/:reviewId", write.deleteReview);

module.exports=router;