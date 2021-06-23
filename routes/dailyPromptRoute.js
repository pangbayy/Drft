const express = require("express");
const dailyPromptController = require("./../controllers/dailyPromptController");
const router = express.Router();

router.route("/").get(dailyPromptController.getJournalPrompts);

module.exports = router;
