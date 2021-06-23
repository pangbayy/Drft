const Journal = require("./../models/journalModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const mongoose = require("mongoose");

exports.createJournal = catchAsync(async (req, res, next) => {
  //first find the user to create a new Journal

  const user = await User.findById(req.body.userId);
  const newJournal = await Journal.create({
    title: req.body.title,
    content: req.body.content,
    author: user,
  });
  //update the user so it's journal array contains the new journal
  User.findById({ _id: req.body.userId }, { useFindAndModify: false })
    .exec()
    .then((user) => {
      user.journals.push(newJournal);
      console.log("THERE");
      user.save(() => console.log("Save successful!"));
    })
    .catch((err) => {
      console.log(err);
      next(new AppError("No user found with the ID", 404));
      return;
    });

  res.status(201).json({
    status: "success",
    data: { newJournal },
  });
});

exports.getAllJournals = catchAsync(async (req, res, next) => {
  const journals = await Journal.find();
  res.status(200).json({
    status: "success",
    data: {
      journals,
    },
  });
});

exports.getAllCollectedJournals = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    next(new AppError("No user found with the ID", 404));
    return;
  }
  const collectedJournals = user.collectedJournals;
  res.status(200).json({
    status: "success",
    data: {
      collectedJournals,
    },
  });
});

exports.getAllWrittenJournals = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    next(new AppError("No user found with the ID", 404));
    return;
  }
  const writtenJournals = user.journals;
  res.status(200).json({
    status: "success",
    data: {
      writtenJournals,
    },
  });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
  const journal = Journal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!journal) {
    next(new AppError("No journal foudn with the ID", 404));
    return;
  }
  res.status(200).json({
    status: "success",
    data: {
      journal,
    },
  });
});

exports.deleteJournal = catchAsync(async (req, res, next) => {
  const journal = await Journal.findByIdAndDelete(req.params.id);

  if (!journal) {
    next(new AppError("No journal foudn with the ID", 404));
    return;
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
