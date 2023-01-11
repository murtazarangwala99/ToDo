const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is Required !"],
  },
  password: {
    type: String,
    require: [true, "Password is Required ! "],
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
