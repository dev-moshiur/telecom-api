const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
  },
  addbalancehistory: [
    {
      ammount: {
        type: String,
      },
      time: {
        type: String,
      },
      paymentmethod: {
        type: String,
      },
      paymentnumber: {
        type: String,
      },
      status: {
        type: String,
      },
      transactionid: {
        type: String,
      },
      email: {
        type: String,
      },
      userphone: {
        type: String,
      },
    },
  ],
  addorderhistory: [
    {
      packagecompany: {
        type: String,
      },
      packagetitle: {
        type: String,
      },
      offernumber: {
        type: String,
      },
      packageprice: {
        type: String,
      },
      offernote: {
        type: String,
      },
      offervalidity: {
        type: String,
      },
      time: {
        type: String,
      },
      status: {
        type: String,
      },
      email: {
        type: String,
      },
      usernumber: {
        type: String,
      },
    },
  ],
  password: {
    type: String,
    requird: true,
  },
});

userSchema.methods.addBalancehis = async function (
  ammount,
  time,
  paymentmethod,
  paymentnumber,
  status,
  transactionid,
  email
) {
  try {
    this.addbalancehistory = this.addbalancehistory.concat({
      ammount,
      time,
      paymentmethod,
      paymentnumber,
      status,
      transactionid,
      email,
    });
    await this.save();
    return this.addbalancehistory;
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.addOrderhis = async function (
  packagecompany,
  packagetitle,
  offernumber,
  packageprice,
  offernote,
  offervalidity,
  time,
  status,
  email,
  usernumber
) {
  try {
    this.addorderhistory = this.addorderhistory.concat({
      packagecompany,
      packagetitle,
      offernumber,
      packageprice,
      offernote,
      offervalidity,
      time,
      status,
      email,
      usernumber,
    });
    await this.save();
    return this.addorderhistory;
  } catch (error) {
    console.log(error);
  }
};
// ---------Hash Password-----------------//

// userSchema.pre("save", async function (next) {
//   console.log("i am the middleware");
//   if (this.isModified("password")) {
//     this.password = bcrypt.hashSync(this.password, 12);
//     console.log(this.password);
//   }
//   next();
// });

const User = mongoose.model("USER", userSchema);

module.exports = User;
