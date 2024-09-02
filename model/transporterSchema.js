const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const transporterSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  orders: [
    {
      id: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
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
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// WE are hashing the password

transporterSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

transporterSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

transporterSchema.methods.pushOrder = async function (
  to,
  from,
  quantity,
  address,
  sender
) {
  try {
    // generate order id here

    const generateId = (char, num) => {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < char; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      for (let i = 0; i < num; i++) {
        result += Math.round(Math.random() * 8) + 1;
      }
      return result;
    };

    const id = generateId(2, 3);

    this.orders = this.orders.concat({
      id,
      to,
      from,
      quantity,
      address,
      sender,
    });

    await this.save();
  } catch (err) {
    console.log(`💥💥💥💥💥 ${err.message}`);
  }
};

const Transporter = mongoose.model("transporter", transporterSchema);

module.exports = Transporter;
