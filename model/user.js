const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPost = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const userDo = mongoose.model("user", UserPost);
module.exports = userDo;
