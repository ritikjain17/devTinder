const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const User = require("../models/user")

// const adminAuth = (req, res, next) =>{

//     token = "xyzoiudhiwugdyt";
//     isAdminAuthorize = token === "xyz";
//     if(!isAdminAuthorize){
//         res.status(401).send("Admin is not authorized");
//     }else{
//         next()
//     }
// }

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }
    const decoded = await jwt.verify(token, "dev@Tinder17");
    console.log("decoded message", decoded);
    console.log(token);

    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("No Data Found !!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error----" + error);
  }
};


module.exports = { userAuth };
