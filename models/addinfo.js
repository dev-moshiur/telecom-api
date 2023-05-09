const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
  bkashnumber: {
    type: String,
  },
  rockectnumber: {
    type: String,
  },
  nagadnumber: {
    type: String,
  },
  whatsapplink: {
    type: String,
  },
  youtubelink: {
    type: String,
  },
  telegramlink: {
    type: String,
  },
  contactphone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Info = mongoose.model("Info", InfoSchema);

module.exports = Info;
