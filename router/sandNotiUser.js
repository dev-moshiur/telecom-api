



const express = require('express');
const router = express.Router();
const sendNoti = require("../expo-push-notification");
router.post('/',async (req, res) => {

try {
const {tittle,message} = req.body;
const amninTokens = await NotificationReciever.find({ role: "user" });
  console.log(amninTokens)
  let messages = [];
  amninTokens.forEach((item) => {
    messages = [
      ...messages,
      {
        to: item.token,
        title: tittle,
        body: message,
        data: {
          key: "value",
          link: "exp://exp.host/@moshiurr/my-app",
        },
        icon: "../assets/appicon.png",
      },
    ];
  });
  sendNoti(messages);
  



res.status(200).json('Notification sent successfully');
} catch (error) {
res.status(500).json(error);
}
});
//Update

module.exports = router;