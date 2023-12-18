const express = require("express");
const router = express.Router();
const write = require("../controller/CWrite")

router.get("/", write.writePage);

export default router;