const mongoose = require("mongoose");

const OrderlockSchema = new mongoose.Schema({
  lockstatus: {
    type: String,
  },
  locknote: {
    type: String,
  },
});
const UploadvideoSchema = new mongoose.Schema({
  videoslink: {
    type: String,
  },
});
const AddgroupSchema = new mongoose.Schema({
  telegramgroup: {
    type: String,
  },
  facebookgroup: {
    type: String,
  },
  whatsappgroup: {
    type: String,
  },
  websitelink: {
    type: String,
  },
  youtubelink: {
    type: String,
  },
});
const Addappversion = new mongoose.Schema({
  appversion: {
    type: String,
  },
  applink: {
    type: String,
  },
});

const Orderlock = mongoose.model("Orderlock", OrderlockSchema);
const Uploadvideo = mongoose.model("uploadvideo", UploadvideoSchema);
const Addgroup = mongoose.model("Addgroup", AddgroupSchema);
const Appversion = mongoose.model("Addappversion", Addappversion);

module.exports = { Orderlock, Uploadvideo, Addgroup, Appversion };
