const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    maxlength: [100, "Title can not exceed 100 characters."],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // change to user schema later
  content: String,
  date: { type: Date, default: Date.now() },
  meta: {
    anonymous: Boolean,
    private: Boolean,
  },
});

const Journal = mongoose.model("Journal", JournalSchema);

module.exports = Journal;
