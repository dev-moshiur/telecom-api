const express = require("express");
const router = express.Router();
const sendNoti = require('../expo-push-notification')
const NotificationUser = require('../models/NotificationReciever')

router.get("/", async (req, res) => {
  try {
    console.log('okey')
    sendNoti()
    
    const user = await NotificationUser.find()
    // const dd = await NotificationUser.deleteMany({})
      res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/', async(req,res) => {
  try {
   
    if (req.body) {
      
    
    const {token,email,role} = req.body
    const user = await NotificationUser.find({token})

    
    if (user.length>0) {
    
      
      const {_id,email:emil,role:rol} = user[0]
     
      if (emil == email && rol == role) {
        console.log('nothing')
        res.status(200).json({})
        
      }
      else if (emil != email || rol != role) {
        await NotificationUser.findByIdAndUpdate(_id,
          {$set:req.body},
          {new:true})
          console.log('updated')
          res.status(200).json({})
      }
      
      
      
      
      
    }
    
    else if(user.length == 0){
      
      const newUser =  new NotificationUser({token,email,role})
       await newUser.save()
       console.log('created')
       res.status(200).json({})
      

    }
  }
    
  } catch (error) {
    console.log(error)
    
  }
  
 

})

module.exports = router;