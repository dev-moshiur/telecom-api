const { Expo } = require("expo-server-sdk");
let expo = new Expo();

const sendNoti = async (messageall = []) => {
  try {
    let messages = [...messageall];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
  })();
  let receiptIds = tickets.map((ticket) => ticket.id);
  let receiptChunk = await expo.getPushNotificationReceiptsAsync(receiptIds);
  console.log(receiptChunk)
    
  } catch (error) {
    console.log(error)
    
  }
  
};
module.exports = sendNoti;
