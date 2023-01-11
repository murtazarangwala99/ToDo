const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  tasks: {
    type: [{ type: String }],
  },
});
module.exports = mongoose.model("Todo", todoSchema);
