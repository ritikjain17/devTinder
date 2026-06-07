const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://ritikj481_db_user:Ritik123@namastenode.zr9apww.mongodb.net/devTinder?retryWrites=true&w=majority",
  );
};

module.exports = connectDb;