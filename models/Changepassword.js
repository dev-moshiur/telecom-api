const mongoose = require("mongoose");

const Changepassword = new mongoose.Schema({
  useremail: {
    type: String,
  },
  time: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const allchangepassword = mongoose.model("allchangepassword", Changepassword);

module.exports = allchangepassword;
