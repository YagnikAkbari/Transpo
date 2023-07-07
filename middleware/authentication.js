const jwt = require("jsonwebtoken");
const Transporter = require("../model/transporterSchema");
const Manufacturer = require("../model/manufacturerSchema");

const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    let res;
    res = await Transporter.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!res) {
      res = await Manufacturer.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
    }
    const rootUser = res;
    if (!rootUser) throw new Error("User not Found!");

    req.token = token;
    req.rootUser = rootUser;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No Token Provided 💥💥💥");
  }
};

module.exports = Authentication;
