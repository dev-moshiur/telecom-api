const mongoose = require("mongoose");

const AllrefundSchema = new mongoose.Schema({
  ammount: {
    type: String,
  },
  time: {
    type: String,
  },
  paymentmethod: {
    type: String,
  },
  paymentnumber: {
    type: String,
  },

  status: {
    type: String,
  },
  email: {
    type: String,
  },
  usernumber: {
    type: String,
  },
});

const Allrefundhistory = mongoose.model("Allrefundhistory", AllrefundSchema);

module.exports = Allrefundhistory;
