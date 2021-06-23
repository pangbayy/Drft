const express = require("express");
const journalController = require("./../controllers/journalController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(journalController.getAllJournals)
  .get(authController.isLoggedIn, journalController.getAllCollectedJournals)
  .get(authController.isLoggedIn, journalController.getAllWrittenJournals)

  .post(journalController.createJournal);

router
  .route("/:id")
  .patch(authController.isLoggedIn, journalController.updateJournal)
  .delete(authController.isLoggedIn, journalController.deleteJournal);

module.exports = router;
