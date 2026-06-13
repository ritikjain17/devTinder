const express = require("express");
const { userAuth } = require("./middleware/auth");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validationSignData } = require("./utils/validation");
const brcypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
console.log("authRouter:", typeof authRouter);
console.log("profileRouter:", typeof profileRouter);
console.log("requestRouter:", typeof requestRouter);
app.use('/' , authRouter);
app.use('/' , profileRouter);


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
