const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const manufacturerSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  repelies: [
    {
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
});

// WE are hashing the password

manufacturerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

manufacturerSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

manufacturerSchema.methods.pushReply = async function (
  price,
  to,
  from,
  sender,
  id,
  quantity,
  address
) {
  const replyIndex = this.repelies.findIndex((reply) => reply.id === id);

  if (replyIndex !== -1) {
    // If a match is found, update the price of the reply
    this.repelies[replyIndex].price = price;
  } else {
    // If no match is found, append a new reply object to the array
    this.repelies.push({
      price,
      to,
      from,
      sender,
      id,
      quantity,
      address,
    });
  }
  await this.save();
};

const Manufacturer = mongoose.model("manufacturer", manufacturerSchema);

module.exports = Manufacturer;

// const reply = this.repelies.find((reply) => reply.id === id);
// console.log(reply?.id);
// this.repelies.forEach((elem) => {
//   if (reply.id === id) {
//     elem.price = price;
//   }
// });

// const replyIndex = this.repelies.findIndex((reply) => reply.id === id);

// if (replyIndex !== -1) {
//   // If a match is found, update the price of the reply
//   this.repelies[replyIndex].price = price;
// } else {
//   // If no match is found, append a new reply object to the array
//   this.repelies.push({
//     price,
//     to,
//     from,
//     sender,
//     id,
//     quantity,
//     address,
//   });
// }
// await this.save();

// // if repelies is match with incoming id then update the price onlt
// this.repelies = this.repelies.concat({
//   price,
//   to,
//   from,
//   sender,
//   id,
//   quantity,
//   address,
// });
// await this.save();
