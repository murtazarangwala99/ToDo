const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: [30, "Title must be less than 30 Charcters !"],
    },
    tasks: {
      type: [{ type: String }],
    },
    userId: {
      type: String,
      require: [true, "UserId is required !"],
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
