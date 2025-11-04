const express = require('express');
const aiController = require("../controller/ai.controller")

const router = express.Router();


router.post("/get-review", aiController.getReview)
router.post("/chat", aiController.chatWithAI);

module.exports = router;    