const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
  imgurl: {
    type: String,
  },
  imglink: {
    type: String,
  },
});
const NoticeSchema = new mongoose.Schema({
  notice: {
    type: String,
  },
});

const Slider = mongoose.model("Slider", SliderSchema);
const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = { Slider, Notice };
