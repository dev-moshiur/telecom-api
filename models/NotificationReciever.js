
const mongoose = require("mongoose");

const NotificationUserSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },   
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationUser", NotificationUserSchema);