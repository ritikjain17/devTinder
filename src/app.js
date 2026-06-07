const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());


app.get("/getUser" , async (req, res) => {
    // const users = new User(req.body);
    try{
        // console.log("users" , users)
        const users = await User.findOne({email:"vishal@gmail.com"})
        res.send(users)
    }catch(error){
        console.log(error);
        res.status(400).send("something Went Wrong")
    }
})

// Get All the documents from the user using find method
app.get("/feed" , async (req, res) => {
    // const users = new User(req.body);
    try{
        // console.log("users" , users)
        const users = await User.find({})
        res.send(users)
    }catch(error){
        console.log(error);
        res.status(400).send("something Went Wrong")
    }
})

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

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
