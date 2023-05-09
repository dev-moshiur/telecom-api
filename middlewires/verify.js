





const jwt = require("jsonwebtoken");
const VerifyCode = require('../models/VerifyCode')
const verify = async (req,res, next) => {
  try {
    
    const {code} = req.body;
    const data = await VerifyCode.find({code,email:req.body.email})
    const token = data[0].token
    await VerifyCode.findByIdAndDelete(data[0].id);
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
   
    if (email == req.body.email) {
        console.log('match')
      next();
    } else {
        console.log('dont match')
      next("Email verification failed");
    }
  } catch (error) {
    console.log(error)
    next("Email verification failed");
  }
};

module.exports = verify;