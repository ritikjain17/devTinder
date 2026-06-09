const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: "Ritik",
    },
    lastName: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter Valid Email id --");
        }
      },
    },
    password: {
      type: String,
      required:true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong Password --");
        }
      },
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
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "en-IN")) {
          throw new Error("Invalid mobile number");
        }
      },
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
