const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
    },

    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: [true, "email already exists"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
