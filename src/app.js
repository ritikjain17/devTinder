const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Rahul",
    lastName: "Jain",
    email: "Rahul@gmail.com",
    password: "rahul1345#",
    age: 29,
  });

  try {
    await user.save();
    res.send("Data inserted Successfully");
  } catch (error) {
    res.status(400).send("Something Went Wrong!");
  }
});

connectDb()
  .then(() => {
    console.log("Database connection succesfully Established ..");
    app.listen(7777, () => {
      console.log("server is listening from the port : 7777");
    });
  })
  .catch((error) => {
    console.log("Database connection cannnot Established ..", error);
  });

// console.log("Making a Dev Tinder of backend here!");
