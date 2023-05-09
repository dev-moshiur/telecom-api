const mongoose = require("mongoose");
const DB =
  "mongodb+srv://alomgirmatubber86:imran111@cluster0.b1akp6l.mongodb.net/offerapp?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to the database");
  })
  .catch((e) => {
    console.log("Not connect to the database");
  });
