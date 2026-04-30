require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = async (uri) => {
  console.log("connecting to ", uri);

  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connection to MongoDB", error.message);
      process.exit();
    });
};

module.exports = connectToDatabase;
