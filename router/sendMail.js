
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const VerifyCode = require('../models/VerifyCode')
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
router.post('/',async (req, res) => {

try {
console.log(req.body)

const token = await jwt.sign(
  {
    email: req.body.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1m",
  }
);
const randomNumber = `${Math.random()*100000000000}`.slice(0,6)
console.log(randomNumber)

const single = new VerifyCode({
  email:req.body.email,
  token:token,
  code:randomNumber,
})

const d = await single.save()



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'telecomshop24@gmail.com',
      pass: 'ecswioycwkwprruk'
    }
  });
  
  const mailOptions = {
    from: 'dev.moshiurr@gmail.com',
    to: req.body.email,
    subject: 'Gmail verification code from Telecom App',
    html: `<p>Your verification code is <h1>${randomNumber}</h1></p>`,
    
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).json(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



res.status(200).json(' Has Been Added');
} catch (error) {
res.status(500).json(error);
}
});

module.exports = router;

