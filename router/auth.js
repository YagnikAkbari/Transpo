const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { ValidationCheck } = require("../helpers");

require("../db/conn");
const Manufacturer = require("../model/manufacturerSchema");
const Transporter = require("../model/transporterSchema");

// Register a new transporter and add to database with proptectc password
router.post("/tregister", async (req, res) => {
  const { uname, email, phone, password, cpassword, vehicleId } = req.body;

  if (!uname || !email || !phone || !password || !cpassword || !vehicleId) {
    return res.status(422).json({
      message: "Pleaase fill data properly.",
      errors: ValidationCheck(
        { uname, email, phone, password, cpassword, vehicleId },
        "uname",
        "email",
        "password",
        "phone",
        "password",
        "cpassword",
        "vehicleId"
      ),
    });
  }

  try {
    const transporterExist = await Transporter.findOne({ email: email });

    if (transporterExist) {
      return res.status(422).json({
        message: "Email alreadyy Exist",
        errors: [{ email: "Email already exits." }],
      });
    } else if (password != cpassword) {
      return res.status(422).json({
        message: "password not matched!",
        errors: [{ password: "password not matched!" }],
      });
    } else {
      const transporter = new Transporter({
        uname,
        email,
        phone,
        vehicleId,
        password,
        userType: "TRANSPORTER",
      });

      await transporter.save();
      return res.status(201).json({ message: "User registered successfully." });
    }
  } catch (err) {
    return res
      .send(500)
      .json({ message: "Something went Wrong. (Server Error)" });
  }
});

// Register a new manufacturer and add to database with proptectc password
router.post("/mregister", async (req, res) => {
  const { uname, email, phone, password, cpassword, address } = req.body;

  // Check for missing fields
  if (!uname || !email || !phone || !password || !cpassword || !address) {
    return res.status(422).json({
      message: "Please fill data properly.",
      errors: ValidationCheck(
        { uname, email, phone, password, cpassword, address },
        "uname",
        "email",
        "password",
        "phone",
        "password",
        "cpassword",
        "address"
      ),
    });
  }

  try {
    // Check if the manufacturer already exists
    const manufacturerExist = await Manufacturer.findOne({ email: email });

    if (manufacturerExist) {
      return res.status(422).json({
        message: "Email already exists...",
        errors: [{ email: "Email already exists." }],
      });
    }

    // Check if passwords match
    if (password !== cpassword) {
      return res.status(422).json({
        message: "Passwords do not match!",
        errors: [{ password: "Passwords do not match!" }],
      });
    }

    // Create a new manufacturer
    const manufacturer = new Manufacturer({
      uname,
      email,
      phone,
      address,
      password,
      userType: "MANUFACTURER",
    });

    await manufacturer.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. (Server Error)" });
  }
});

router.post("/tsignin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Enter Proper Details",
      errors: ValidationCheck({ email, password }, "email", "password"),
    });
  }
  let token;
  try {
    const userLogin = await Transporter.findOne({ email: email });

    if (userLogin) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );
      token = await userLogin.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });

      if (isPasswordMatch) {
        res.status(200).json({ message: "User Login Successful." });
      } else {
        return res.status(400).json({
          message: "Enter Proper Details",
          errors: [{ password: "Invalid Password." }],
        });
      }
    } else {
      res.status(400).json({
        message: "Email is not register with us",
        errors: [{ password: "Email is not register with us" }],
      });
    }
  } catch (err) {
    res.send(500).json({ message: "Something went Wrong. (Server Error)" });
  }
});

// login for manufacturer
router.post("/msignin", async (req, res) => {
  const { email, password } = req.body;
  console.log("cors", email, password);

  if (!email || !password) {
    return res.status(400).json({
      message: "Enter Proper Details",
      errors: ValidationCheck({ email, password }, "email", "password"),
    });
  }

  let token;
  try {
    const userLogin = await Manufacturer.findOne({ email: email });

    if (userLogin) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );
      token = await userLogin.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000),
        httpOnly: true,
      });

      if (isPasswordMatch) {
        res.status(200).json({ mssage: "User Login Successful." });
      } else {
        return res.status(400).json({
          message: "Enter Proper Details",
          errors: [{ password: "Invalid Password." }],
        });
      }
    } else {
      res.status(400).json({
        message: "Email is not register with us",
        errors: [{ password: "Email is not register with us" }],
      });
    }
  } catch (err) {
    res.send(500).json({ message: "Something went Wrong. (Server Error)" });
  }
});

router.get("/getData", authentication, (req, res) => {
  if (!req.rootUser) {
    res.status(400).send("No User Logged In.");
  }

  res.send(req.rootUser);
});

router.get("/getTransporter", async (req, res) => {
  try {
    const response = await Transporter.find({});
    if (!response) {
      return res.status(422).send({ message: "no transpoter found!" });
    }
    const transpoters = response.map((res) => res.uname);
    res.status(200).json(transpoters);
  } catch (err) {
    res.send(500).json({ message: "Something went Wrong. (Server Error)" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("logout properlly");
});

router.post("/pushManuOrder", authentication, async (req, res) => {
  try {
    const { to, from, quantity, transporter, address } = req.body;
    const sender = req.rootUser.uname;
    if (!to || !from || !quantity || !transporter || !address || !sender) {
      return res.status(422).send({ message: "fill data properly" });
    } else {
      const response = await Transporter.findOne({ uname: transporter });
      const receiverUser = response;

      if (!response) {
        return res.status(400).send({ message: "no user found" });
      }
      receiverUser.pushOrder(
        to.trim(),
        from.trim(),
        quantity,
        address.trim(),
        sender
      );

      res.status(200).send({ message: "order registered." });
    }
  } catch (err) {
    res.send(500).json({ message: "Something went Wrong. (Server Error)" });
  }
});

router.get("/getTOrder", authentication, async function (req, res) {
  if (!req.rootUser) {
    res.status(400).send("orders not fetched.");
  }
  res.send(req.rootUser);
});

router.post("/pushTOrder", async (req, res) => {
  try {
    const {
      receiver: sender,
      price,
      order: { to, from, id, sender: receiver, quantity, address },
    } = req.body;

    if (!price || !receiver) {
      return res.status(422).send({ message: "fill data properly" });
    } else {
      const response = await Manufacturer.findOne({ uname: receiver });

      const receiverUser = response;
      if (!receiverUser) {
        return res.status(404).send({ message: "no user found!" });
      }
      receiverUser.pushReply(price, to, from, sender, id, quantity, address);
      res.status(200).send({ message: "data send Successful!" });
    }
  } catch (err) {
    res.send(500).json({ message: "Something went Wrong. (Server Error)" });
  }
});

router.get("/getMReply", authentication, async function (req, res) {
  if (!req.rootUser) {
    res.status(400).send("data not fetched.");
  }
  res.send(req.rootUser);
});

module.exports = router;

// module.exports = ValidationCheck;
