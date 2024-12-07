const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/form");


let createSchema = mongoose.Schema({
  name:String,
  email: String,
  password: String,
  contact:Number,
});
module.exports = mongoose.model("create",createSchema);

