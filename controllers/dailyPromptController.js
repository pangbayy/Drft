const Daily = require("./../models/dailyModel");
const catchAsync = require("./../utils/catchAsync");

exports.getJournalPrompts = catchAsync(async (req, res, next) => {
  const dt = new Date();
  const month = String(dt.getMonth() + 1);
  const date = String(dt.getDate());
  const prompt = await Daily.find({
    month: month,
    date: date,
  });

  res.status(200).json({
    status: "success",
    data: {
      prompt,
    },
  });
});
