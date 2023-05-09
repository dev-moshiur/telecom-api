const mongoose = require("mongoose");

const AllorderhistorySchema = new mongoose.Schema({
  packagecompany: {
    type: String,
  },
  packagetitle: {
    type: String,
  },
  offernumber: {
    type: String,
  },
  packageprice: {
    type: String,
  },
  offernote: {
    type: String,
  },
  offervalidity: {
    type: String,
  },
  time: {
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
  username: {
    type: String,
  },
});

const Allorderhistory = mongoose.model(
  "Allorderhistory",
  AllorderhistorySchema
);

module.exports = Allorderhistory;
