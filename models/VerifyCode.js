


const mongoose = require('mongoose');
const VerifyCodeSchema = new mongoose.Schema(
{
email: {
type: String,
 require: true,
},
code: {
type: String,
 require: true,
},
token: {
type: String,
 require: true,
},
},
{ timestamps: true }
);
module.exports = mongoose.model('VerifyCode',VerifyCodeSchema);