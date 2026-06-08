const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: "Ritik",
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    skills: {
      type: [String],
    },
    mobile: {
      type: Number,
      minLength: 10,
      maxLength: 10,
      unique:true
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
