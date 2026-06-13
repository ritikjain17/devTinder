const express = require("express");
const User = require("../models/user");
const { validationSignData } = require("../utils/validation");
// const { userAuth } = require("../middleware/auth");
const brcypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    validationSignData(req);

    const protectedPassword = await brcypt.hash(password, 5);

    const user = new User({
      firstName,
      lastName,
      email,
      password: protectedPassword,
    });

    await user.save();
    res.send("Data inserted Successfully");
  } catch (error) {
    console.log("error ----", error);
    res.status(400).send("Something Went Wrong!" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.findOne({ email: email });

    if (!users) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await users.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await users.getJwt();
      res.cookie("token", token);
      res.send("Login Successfully!!");
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong" + error);
  }
});

module.exports = authRouter;
