const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const NotificationReciever = require("../models/NotificationReciever");
const Package = require("../models/AddpackageSchema");
const sendNoti = require("../expo-push-notification");
const Allbalancehistory = require("../models/AlladbalanceSchema");
const Allorderhistory = require("../models/AddorderSchema");
const Allrefundhistory = require("../models/Addrefund");

const Info = require("../models/addinfo");
const {
  Orderlock,
  Uploadvideo,
  Addgroup,
  Appversion,
} = require("../models/OrderlockSchema");
const { Slider, Notice } = require("../models/Addslider");
const allchangepassword = require("../models/Changepassword");

// -----------------------------User Registration-------------------------------//
router.post("/register", async (req, res) => {
  const { name, email, phone, password, balance } = req.body;

  try {
    const CheckEmail = await User.findOne({ email });

    if (CheckEmail) {
      return res.status(422).send("Email Is Already Exits");
    } else {
      const users = new User({
        name,
        email,
        phone,
        password,
        balance,
      });
      await users.save();
      res.status(201).json(users);
    }
  } catch (error) {
    res.status(422).send(error);
    console.log(error);
  }
});

// //-----------------------------User Login-----------------------------//
router.post("/login", async (req, res) => {
  try {
    const { phone, pass } = req.body;

    let Finduser = await User.findOne({ phone });

    if (Finduser) {
      const passwordMatch = pass == Finduser.password;
      if (passwordMatch) {
        res.status(201).json(Finduser);
      } else {
        res.status(404).send("Wrong Password");
      }
    } else {
      res.status(404).send("Invalid Credientials");
    }
  } catch (error) {
    res.status(422).send("Invalid credentials");
  }
});
// /////////////////////////Change password/////////////////////////////

router.post("/changepassword", async (req, res) => {
  const { useremail, newpassword, oldpassword } = req.body;

  let userdata = await User.findOne({ email: useremail });

  const passwordMatch = oldpassword == userdata.password;

  if (passwordMatch) {
    await User.updateOne(
      {
        email: useremail,
      },
      {
        $set: {
          password: newpassword,
        },
      }
    );
    res.send("password changed");
  } else {
    res.status(404).send("password not changed");
  }
});
router.post("/forgetchangepass", async (req, res) => {
  const { useremail, newpassword } = req.body;

  await User.updateOne(
    {
      email: useremail,
    },
    {
      $set: {
        password: newpassword,
      },
    }
  );
  res.send("password changed");
});

// //-----------------------------Add Offer Package-----------------------------//

router.post("/addpackage", async (req, res) => {
  const {
    offertitle,
    offervalidity,
    offerprice,
    regularprice,
    discountprice,
    offernote,
    packagecompany,
  } = req.body;

  try {
    const package = new Package({
      offertitle,
      offervalidity,
      offerprice,
      regularprice,
      discountprice,
      offernote,
      packagecompany,
    });
    await package.save();
    res.status(201).send("Package Added sucessfully");
  } catch (error) {
    res.status(404).send(error);
  }
});
// ---------------Edit Package------------------//
router.post("/editpackage", async (req, res) => {
  const {
    _id,
    offertitle,
    offerprice,
    regularprice,
    discountprice,
    offernote,
  } = req.body;

  try {
    await Package.updateOne(
      { _id },
      {
        offertitle,
        offerprice,
        regularprice,
        discountprice,
        offernote,
      }
    );
    res.status(201).send("Package Edited sucessfully");
  } catch (error) {
    res.status(404).send(error);
  }
});

// //-----------------------------Get All BalanceHistory-----------------------------//

router.get("/alladbalancehistory", async (req, res) => {
  const Allblhistory = await Allbalancehistory.find();

  res.status(201).json(Allblhistory);
});
// //-----------------------------Get All Orderhistory-----------------------------//

router.get("/allorderhistory", async (req, res) => {
  const Allorhistory = await Allorderhistory.find();

  res.status(201).json(Allorhistory);
});
// //-----------------------------Get All Orderhistory-----------------------------//

router.get("/allrefundhistory", async (req, res) => {
  const Allrefundhis = await Allrefundhistory.find();

  res.status(201).json(Allrefundhis);
});
// //-----------------------------Get PendingHistory-----------------------------//

router.get("/getpendingaddbalance", async (req, res) => {
  const Pendinghistory = await Allbalancehistory.find({ status: "pending" });

  res.status(201).json(Pendinghistory.length);
});
router.get("/getpendingpassrequest", async (req, res) => {
  const Allchangepass = await allchangepassword.find();
  res.status(201).json(Allchangepass.length);
});
// //-----------------------------Get PendingHistoryOrder-----------------------------//

router.get("/getpendingorder", async (req, res) => {
  const Pendinghistory = await Allorderhistory.find({ status: "pending" });
  res.status(201).json(Pendinghistory.length);
});
// //-----------------------------Get PendingRefundhistory-----------------------------//

router.get("/getpendingrefund", async (req, res) => {
  const Pendinghistory = await Allrefundhistory.find({ status: "pending" });
  res.status(201).json(Pendinghistory.length);
});

// //-----------------------------Get Packages-----------------------------//

router.get("/getpackages", async (req, res) => {
  const AllPackges = await Package.find();
  res.status(201).json(AllPackges);
});
// //-----------------------------Delete Packages-----------------------------//

router.delete("/deletepackages", async (req, res) => {
  const { offertitle } = req.body;
  await Package.deleteOne({ offertitle });
  res.status(201).send("Package Delete Successfully");
});

// //-----------------------------Add Info-----------------------------//

router.post("/addinfo", async (req, res) => {
  const {
    bkashnumber,
    rockectnumber,
    nagadnumber,
    whatsapplink,
    youtubelink,
    telegramlink,
    contactphone,
    email,
  } = req.body;

  await Info.updateOne(
    { _id: "63efbc9631d60205c0ea9bdb" },
    {
      bkashnumber,
      rockectnumber,
      nagadnumber,
      whatsapplink,
      youtubelink,
      telegramlink,
      contactphone,
      email,
    }
  );
  res.status(201).send("Info Successfully Added");
});
// //-----------------------------Get Info-----------------------------//

router.get("/getinfo", async (req, res) => {
  const GetInfo = await Info.findOne();
  res.status(201).json(GetInfo);
});

// //-----------------------------Post Add balance-----------------------------//

router.post("/postaddbalance", async (req, res) => {
  try {
    const {
      ammount,
      time,
      paymentmethod,
      paymentnumber,
      status,
      transactionid,
      email,
      userphone,
      username,
    } = req.body;
    const Allblhistory = new Allbalancehistory({
      ammount,
      time,
      paymentmethod,
      paymentnumber,
      status,
      transactionid,
      email,
      userphone,
      username,
    });
    await Allblhistory.save();


  const findUser = await User.findOne({ phone: userphone });

  if (findUser) {
    await findUser.addBalancehis(
      ammount,
      time,
      paymentmethod,
      paymentnumber,
      status,
      transactionid,
      email
    );
    //work
    const amninTokens = await NotificationReciever.find({ role: "admin" });
    console.log(amninTokens)
    let messages = [];
    amninTokens.forEach((item) => {
      messages = [
        ...messages,
        {
          to: item.token,
          title: "Add balance Request",
          body: `You got ${ammount} taka add balance request for ${userphone}`,
          data: {
            key: "value",
            link: "exp://exp.host/@moshiurr/telocomshop-admin",
          },
          icon: "../assets/appicon.png",
        },
      ];
    });
    sendNoti(messages);

    res.send("Successful Balance History");
    console.log("Successfully History Added");
  } else {
    res.status(402).send("usernot found");
  }
    
  } catch (error) {
    console.log(error)
    
  }


 
  
  
});

// ------------Buy Order Request ---------------//
//work
/////////////////////////Buy Order//////////////////
router.post("/buyorder", async (req, res) => {
  
  const {
    offerdetail,
    time,
    number,
    status,
    email,
    usernumber,
    userbalance,
    username,
  } = req.body;
  const Totalbalancemain = +userbalance - +offerdetail.offerprice;

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        balance: Totalbalancemain,
      },
    }
  );

  const Allorhistory = new Allorderhistory({
    packagecompany: offerdetail.packagecompany,
    packagetitle: offerdetail.offertitle,
    offernumber: number,
    packageprice: offerdetail.offerprice,
    offernote: offerdetail.offernote,
    offervalidity: offerdetail.offervalidity,
    time,
    status,
    email,
    usernumber,
    username,
  });

  await Allorhistory.save();

  const findUser = await User.findOne({ phone: usernumber });

  await findUser.addOrderhis(
    offerdetail.packagecompany,
    offerdetail.offertitle,
    number,
    offerdetail.offerprice,
    offerdetail.offernote,
    offerdetail.offervalidity,
    time,
    status,
    email,
    usernumber
  );

  const amninTokens = await NotificationReciever.find({ role: "admin" });
    console.log(amninTokens)
    let messages = [];
    amninTokens.forEach((item) => {
      messages = [
        ...messages,
        {
          to: item.token,
          title: "Add balance Request",
          body: `You ${offerdetail} buy offer request for ${usernumber}`,
          data: {
            key: "value",
            link: "exp://exp.host/@moshiurr/telocomshop-admin",
          },
          icon: "../assets/appicon.png",
        },
      ];
    });
    sendNoti(messages);
  res.status(201).json(Totalbalancemain);
});
// //-----------------------------Get UserData-----------------------------//

router.post("/getbalancecustomer", async (req, res) => {
  const { phone } = req.body;
  const Getuserdata = await User.findOne({ phone }, { addbalancehistory: 1 });
  res.status(201).json(Getuserdata);
});
router.post("/getordercustomer", async (req, res) => {
  // here
  console.log("reached");
  const { phone } = req.body;
  const Getuserdata = await User.findOne({ phone }, { addorderhistory: 1 });
  res.status(201).json(Getuserdata);
});
/////////////////////////Get User Data////////////////////////////////
router.post("/getUserdata", async (req, res) => {
  const { phone } = req.body;
  const Getuserdata = await User.findOne({ phone });
  res.status(201).json(Getuserdata);
});

// //////////////////////////////////Add Add balance Money/////////////////
router.post("/addmoney", async (req, res) => {
  const { email, ammount, status, currentbalance, transactionid } = req.body;

  const Totalbalance = +ammount + +currentbalance;

  try {
    if (status == "successful") {
      await User.updateOne(
        { email, "addbalancehistory.transactionid": transactionid },
        {
          $set: {
            "addbalancehistory.$.status": status,
            "addbalancehistory.$.ammount": ammount,
            balance: Totalbalance,
          },
        }
      );
      await Allbalancehistory.findOneAndUpdate(
        { transactionid },
        {
          $set: {
            status: status,
            ammount: ammount,
          },
        }
      );

      res.status(201).send("Add money Successfully");
    } else {
      await User.updateOne(
        { email, "addbalancehistory.transactionid": transactionid },
        {
          $set: {
            "addbalancehistory.$.status": status,
          },
        }
      );
      await Allbalancehistory.findOneAndUpdate(
        { transactionid },
        {
          $set: {
            status,
          },
        }
      );
    }

    res.status(201).send("Add money Successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/acceptorder", async (req, res) => {
  const { email, time, status, ammount, currentbalance, refundbal } = req.body;
  const Totalbalancemain = +currentbalance + +ammount;

  try {
    if (status == "successful") {
      if (refundbal == 0) {
        await User.updateOne(
          { email, "addorderhistory.time": time },
          {
            $set: {
              "addorderhistory.$.status": status,
              "addorderhistory.$.packageprice": ammount,
            },
          }
        );
        await Allorderhistory.findOneAndUpdate(
          { time },
          {
            $set: {
              status,
              packageprice: ammount,
            },
          }
        );
        res.status(201).send("Order Done Successfully");
      } else {
        await User.updateOne(
          { email, "addorderhistory.time": time },
          {
            $set: {
              "addorderhistory.$.status": status,
              "addorderhistory.$.packageprice": ammount,
              balance: +currentbalance + +refundbal,
            },
          }
        );
        await Allorderhistory.findOneAndUpdate(
          { time },
          {
            $set: {
              status,
              packageprice: ammount,
            },
          }
        );
        res.status(201).send("Order Done Successfully");
      }
    } else {
      await User.updateOne(
        { email, "addorderhistory.time": time },
        {
          $set: {
            "addorderhistory.$.status": status,
            balance: Totalbalancemain,
          },
        }
      );
      await Allorderhistory.findOneAndUpdate(
        { time },
        {
          $set: {
            status,
          },
        }
      );
      res.status(201).send("Order Failed");
    }
  } catch (error) {
    console.log(error);
  }
});

//work
router.post("/postrefund", async (req, res) => {
  const {
    ammount,
    time,
    paymentmethod,
    paymentnumber,
    status,
    email,
    usernumber,
    userbalance,
  } = req.body;
  const Totalbalancemain = +userbalance - +ammount;

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        balance: Totalbalancemain,
      },
    }
  );

  const Allrefundhis = new Allrefundhistory({
    ammount,
    time,
    paymentmethod,
    paymentnumber,
    status,
    email,
    usernumber,
  });
  await Allrefundhis.save();

  const amninTokens = await NotificationReciever.find({ role: "admin" });
  console.log(amninTokens)
  let messages = [];
  amninTokens.forEach((item) => {
    messages = [
      ...messages,
      {
        to: item.token,
        title: "Add balance Request",
        body: `refund request for ${usernumber}`,
        data: {
          key: "value",
          link: "exp://exp.host/@moshiurr/telocomshop-admin",
        },
        icon: "../assets/appicon.png",
      },
    ];
  });
  sendNoti(messages);
  

  res.status(201).json(Totalbalancemain);
});

router.post("/addrefund", async (req, res) => {
  const { email, ammount, status, currentbalance, time, refundbal } = req.body;
  const Totalbalancemain = +currentbalance + +ammount;

  try {
    if (status == "successful") {
      if (refundbal == 0) {
        await Allrefundhistory.findOneAndUpdate(
          { time },
          {
            $set: {
              status,
            },
          }
        );
        res.status(201).send("Refund Done Successfully");
      } else {
        await User.findOneAndUpdate(
          { email },
          {
            $set: {
              balance: +currentbalance + refundbal,
            },
          }
        );
        await Allrefundhistory.findOneAndUpdate(
          { time },
          {
            $set: {
              status,
            },
          }
        );
        res.status(201).send("Refund Done Successfully");
      }
    } else {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            balance: Totalbalancemain,
          },
        }
      );
      await Allrefundhistory.findOneAndUpdate(
        { time },
        {
          $set: {
            status,
          },
        }
      );
      res.status(201).send("Refund Done Successfully");
    }
  } catch (error) {
    console.log(error);
  }
});
// ////////////////////Order Lock //////////////////////////////
router.post("/orderlock", async (req, res) => {
  const { lockstatus, locknote } = req.body;
  await Orderlock.updateOne(
    { _id: "63f1dec2ffefca0fb08b56b0" },
    {
      lockstatus,
      locknote,
    }
  );

  res.status(201).send("Order Lock Successfully");
});
router.get("/getorderlock", async (req, res) => {
  const Getorderlcok = await Orderlock.findOne();
  res.status(201).json(Getorderlcok);
});

router.post("/manualaddbalance", async (req, res) => {
  const {
    ammount,
    time,
    paymentmethod,
    paymentnumber,
    status,
    transactionid,
    email,
    userphone,
  } = req.body;

  const findUser = await User.findOne({ email });

  let totalbal = +findUser.balance + +ammount;
  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        balance: totalbal,
      },
    }
  );

  const Allblhistory = new Allbalancehistory({
    ammount,
    time,
    paymentmethod,
    paymentnumber,
    status,
    transactionid,
    email,
    userphone,
  });
  await Allblhistory.save();

  await findUser.addBalancehis(
    ammount,
    time,
    paymentmethod,
    paymentnumber,
    status,
    transactionid,
    email
  );
  res.status(201).send("Balance Added");
});

router.get("/getalluser", async (req, res) => {
  const Alluserdata = await User.find();
  res.status(201).json(Alluserdata);
});

router.post("/searchuser", async (req, res) => {
  const { phone } = req.body;
  let response = await User.find({ phone });

  res.status(201).send(response);
});

router.post("/addslider", async (req, res) => {
  const { imgurl, imglink } = req.body;
  const Addslides = new Slider({ imgurl, imglink });
  await Addslides.save();
  res.send("successfull");
});

router.get("/getsliders", async (req, res) => {
  const Sliders = await Slider.find();
  res.status(201).json(Sliders);
});
router.post("/deleteslider", async (req, res) => {
  const { _id } = req.body;
  await Slider.findByIdAndDelete(_id);
  res.status(201).send("delete successfully");
});

router.post("/addnotice", async (req, res) => {
  const { notice } = req.body;

  await Notice.updateOne(
    { _id: "640d5f5f7911c8339816b960" },
    {
      notice,
    }
  );

  res.status(201).send("Order Lock Successfully");
});
router.get("/getnotice", async (req, res) => {
  const Notices = await Notice.findOne();
  res.status(201).send(Notices);
});
router.post("/postchangepass", async (req, res) => {
  const { useremail, time } = req.body;
  const findeuser = await User.findOne({ email: useremail });

  if (findeuser.length !== 0) {
    const Allpassrequest = new allchangepassword({
      useremail,
      time,
      phone: findeuser.phone,
    });
    await Allpassrequest.save();
    res.status(201).send("Change Pass successfully");
  } else {
    res.status(402).send("user not found");
  }
});

router.get("/getchangepass", async (req, res) => {
  const Allchangepass = await allchangepassword.find();
  res.status(201).json(Allchangepass);
});

router.post("/uploadvideo", async (req, res) => {
  const { videoslink } = req.body;
  const Videos = new Uploadvideo({ videoslink });
  Videos.save();
  res.status(201).send("video upload successful");
  console.log(videoslink);
});
router.get("/getvideos", async (req, res) => {
  const allvideos = await Uploadvideo.find();
  res.status(201).json(allvideos);
});
router.post("/deletevidoes", async (req, res) => {
  const { _id } = req.body;
  await Uploadvideo.findOneAndDelete({ _id });
  res.status(201).send("Video Deleted Succesfully");
});

router.post("/addgrouplink", async (req, res) => {
  const {
    telegramgroup,
    facebookgroup,
    whatsappgroup,
    websitelink,
    youtubelink,
  } = req.body;
  await Addgroup.updateOne(
    { _id: "642719c3a6aed510fcd8f946" },
    {
      telegramgroup,
      facebookgroup,
      whatsappgroup,
      websitelink,
      youtubelink,
    }
  );
  res.status(201).send("Group added Successfully");
});

router.get("/getallgroups", async (req, res) => {
  const allgroups = await Addgroup.findOne();
  res.status(201).json(allgroups);
});
router.post("/deletegroups", async (req, res) => {
  const { _id } = req.body;

  await Addgroup.findOneAndDelete({ _id });
  res.status(201).send("Group Deleted Succesfully");
});

router.post("/updateappversion", async (req, res) => {
  const { appversion, applink } = req.body;

  await Appversion.updateOne(
    { _id: "6425485eb605e931001d2ec1" },
    {
      appversion,
      applink,
    }
  );
  res.status(201).send("App version changed successfully");
});

router.get("/getappversion", async (req, res) => {
  const appDetails = await Appversion.findOne();
 
  res.status(201).json(appDetails);
});

module.exports = router;
