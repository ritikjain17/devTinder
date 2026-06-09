const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validationSignData } = require("./utils/validation");
const brcypt = require("bcrypt");

const app = express();

app.use(express.json());

app.get("/getUser", async (req, res) => {
  // const users = new User(req.body);
  try {
    // console.log("users" , users)
    const users = await User.findOne({ email: "vishal@gmail.com" });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("something Went Wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log("userid ---", userId);
  const data = req.body;

  try {
    console.log(data);
    const UPDATE_ALLOWED = ["firstName", "age", "password", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) => {
      return UPDATE_ALLOWED.includes(k);
    });
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
      res.status(400).send("UPdate is not alloed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills should be less or equals to 10");
    }
    const users = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      returnDocument: "after",
    });
    console.log("user ---", users);
    res.send("Data updated successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("something Went Wrong" + error);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log("user id ---", userId);
    const users = await User.findByIdAndDelete(userId);
    res.send("user deleted Successfully!");
  } catch (error) {
    res.status(400).send("something went wrong!");
  }
});

// Get All the documents from the user using find method
app.get("/feed", async (req, res) => {
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

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.findOne({ email: email });

    if (!users) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await brcypt.compare(password, users.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      res.send("Login Successfully!!");
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong" + error);
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
