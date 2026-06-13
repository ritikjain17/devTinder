const express = require("express");
const User = require("../models/user");
const { validationSignData } = require("../utils/validation");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();


// Get All the documents from the user using find method
requestRouter.get("/feed", async (req, res) => {
  // const users = new User(req.body);
  try {
    // console.log("users" , users)
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("something Went Wrong");
  }
});


module.exports = requestRouter;