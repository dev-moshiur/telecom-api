const mongoose = require("mongoose");

const AllbalancehistorySchema = new mongoose.Schema({
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
  transactionid: {
    type: String,
  },
  email: {
    type: String,
  },
  userphone: {
    type: String,
  },
  username: {
    type: String,
  },
});

const Allbalancehistory = mongoose.model(
  "Allbalancehistory",
  AllbalancehistorySchema
);

module.exports = Allbalancehistory;
