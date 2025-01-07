const mongoose = require("mongoose");
async function connectMongoDb(url) {
  try {
    console.log("mongodb is connected successfully");
    return mongoose.connect(url);
  } catch (err) {
    console.log("error in connecting mongodb", err);
  }
}
module.exports = { connectMongoDb };
