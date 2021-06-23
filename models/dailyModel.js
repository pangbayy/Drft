const mongoose = require("mongoose");

const DailySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Daily = mongoose.model("Daily", DailySchema, "dailys");

module.exports = Daily;
