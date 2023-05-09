



const router = require("express").Router();
const User = require("../models/userSchema");
const verify = require("../middlewires/verify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER
router.get("/",async (req, res) => {
  try {
    //generate new password
    

    const userNow = await User.find({ ...req.query })
    res.status(200).json(userNow);
 }
  catch (err) {
    res.status(500).json(err);
  }
});
router.post("/register",verify, async (req, res) => {
  console.log('aaaaaa')
  try {
    //generate new password
   
    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone:req.body.phone,
      balance:req.body.balance

    });

    const userNow = await User.find({email :req.body.email})
    

   if (userNow.length>0) {
    res.status(400).json('You are already a user')
    
   } else {
    
  
    const user = await newUser.save();
    res.status(200).json(user);
 }
  } catch (err) {
    res.status(500).json(err);
    
  }
});

//LOGIN
router.post("/login",verify, async (req, res) => {
  try {
    console.log('reached')
    console.log(req.body,'fgfh')
    const user = await User.findOne({ email: req.body.email });
    console.log('first')
    if (!user) {
      console.log('not user')
      res.status(404).json("user not found");
      
    } else {
      console.log('user')
      
    
    

    const validPassword = req.body.password == user.password
      

    if (validPassword) {
      //genarate token

      const token = await jwt.sign(
        {
          name: user.name,

          
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
        }
      );
    user.token = token
        
        res.status(201).json(user)
     
    } else {
      res.status(400).json("wrong password");
    }
  }

    //res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});
router.put("/login",verify, async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      console.log('not user')
      res.status(404).json("user not found");
      
    } else {
      
    
     

      const updateUser = await User.findByIdAndUpdate(
        user._id,
        { $set: {password:req.body.password} },
        { new: true }
      );
    
      //genarate token
      console.log(updateUser)

     
    
        
        res.status(200).json({})
     
    
  }

    //res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;