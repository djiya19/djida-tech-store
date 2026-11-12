
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Password is optional for Google users
    password: {
      type: String,
      minlength: 6,
      select: false
    },

    // Unique Google account identifier
    googleId: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
