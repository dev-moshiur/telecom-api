const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("./db/conn");
const cors = require("cors");
const http = require("http");
const BodyParser = require("body-parser");
const addNotificationReciever = require("./router/addNotificatioReciver"); 
const register = require("./router/register"); 
const sandNotiUser = require("./router/sandNotiUser"); 
const sendMail = require("./router/sendMail"); 
const PORT = process.env.PORT || 5009;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(require("./router/auth"));
app.use("/addNotificationReciever", addNotificationReciever);
app.use("/sandNotiUser", sandNotiUser);
app.use("/register", register);
app.use("/sendMail", sendMail);

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use((err, req, res, next) => {
  if (err) {
    
      res.status(500).send(err.message);
    
  } else {
    res.send("success");
  }
});

const Server = http.createServer(app);

Server.listen(PORT, () => {
  console.log(`Telecom Backend is running on localhost ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send(`Telecom backend Was Live Successfully ${PORT}`);
});
