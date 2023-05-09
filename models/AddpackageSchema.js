const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  offertitle: {
    type: String,
  },
  offervalidity: {
    type: String,
  },

  offerprice: {
    type: String,
  },
  regularprice: {
    type: String,
  },
  discountprice: {
    type: String,
  },
  offernote: {
    type: String,
  },
  packagecompany: {
    type: String,
  },
});

const Allpackage = mongoose.model("allpackage", PackageSchema);

module.exports = Allpackage;
