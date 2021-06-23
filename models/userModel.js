const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Invalid email address"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  journals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
  collectedJournals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal",
    },
  ],
  avatar: String,
  joinDate: { type: Date, required: true },
});

// Pre-save password encryption
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password verification
UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
