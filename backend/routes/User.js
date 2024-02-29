const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const Shortlistt = require("../models/Shortlistt");
const Vendor = require("../models/Vendors");
const Otp = require("../models/Otp");
const cors = require("cors");
router.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "mynamaisharshilranaandiamasoftweredeveloper";
var nodemailer = require("nodemailer");
const { useParams } = require("react-router-dom");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post("/usersignup", async (req, res) => {
  try {
    // console.log(req.body);
    const registerUser = await new User({
      u_name: req.body.name,
      u_email: req.body.email,
      u_number: req.body.number,
      u_gen: req.body.gender,
      u_password: req.body.password,
    });

    const registered = await registerUser.save();

    console.log(registered);
    res.json(registered);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    let userdata = await User.findOne({ u_email: email });
    // console.log(userdata);
    if (!userdata) {
      return res.json({ error: "Try login with correct credentials." });
    }
    const pwdcompare = await bcrypt.compare(password, userdata.u_password);
    // console.log(pwdcompare);
    if (!pwdcompare && email) {
      return res
        .status(400)
        .json({ errors: "Try login with correct credentials" });
    }
    const data = {
      user: {
        id: userdata.id,
      },
    };
    const authToken = jwt.sign(data, jwtsecret);
    return res.json({ success: true, authToken: authToken, id: userdata.id });
  } catch (error) {
    res.status(404).send(error);
    res.json({ sucess: false });
  }
});

router.get("/usereditprofile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await User.findById(id);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/usereditprofile/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, number, gender } = req.body;
  try {
    const user = await User.findById(id);

    if (name && name !== user.u_name) {
      user.u_name = name;
    }
    if (email && email !== user.u_email) {
      user.u_email = email;
    }
    if (number && number !== user.u_number) {
      user.u_number = number;
    }
    if (gender && gender !== user.u_gen) {
      user.u_gen = gender;
    }

    const updatedUser = await user.save();
    // console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/resetpassword/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body.password);
    let opassword = req.body.opassword;
    let password = req.body.password;
    let userdata = await User.findById(id);
    const pwdcompare = await bcrypt.compare(opassword, userdata.u_password);
    // console.log(pwdcompare);
    if (!pwdcompare) {
      return res.status(400).json({ errors: "Old password is not matched" });
    }
    let npassword = await bcrypt.hash(password, 10);
    // console.log(npassword);
    await User.findByIdAndUpdate(id, { u_password: npassword }, { new: true });
    res.json({ sucess: true });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/shortlist/:id", async (req, res) => {
  const vid = req.params.id;
  const uid = req.body.userid;
  try {
    const existingEntry = await Shortlistt.findOne({
      vendor_id: vid,
    });

    if (existingEntry) {
      return res.json({ message: "You already shortlist this vendor :)" });
    }
    // console.log("vendor_id:", vid);
    // console.log("user_id:", uid);
    const vdata = await Vendor.findById(vid);
    // console.log(vdata.v_event);
    const event = vdata.v_event;
    const registerShortlist = new Shortlistt({
      user_id: uid,
      vendor_id: vid,
      event_name: event,
    });
    // console.log(registerShortlist);
    const registered = await registerShortlist.save();

    // console.log(registered);
    res.json(registered);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/shortlist/:id", async (req, res) => {
  try {
    const data = await Vendor.find({});
    const vdata = await Shortlistt.find({ user_id: req.params.id });
    const events = global.events;
    // console.log(data);
    res.json({ data, vdata, events });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/search", async (req, res) => {
  try {
    const data = await Vendor.find({ v_shop_name: req.body.name });
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/vendor", async (req, res) => {
  try {
    const data = await Vendor.find({});
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const email = req.body.email;
    const data = await User.find({ u_email: email });
    console.log(data);
    if (data.length === 0) {
      res.json({ message: "Email id does not exist." });
    } else {
      let otpcode = Math.floor(Math.random() * 9000) + 1000;
      let otpData = new Otp({
        email: email,
        code: otpcode,
      });
      let otpResponse = await otpData.save();
      mailer(email, otpcode);
      if (otpResponse) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Error saving OTP data." });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const mailer = async (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "noisysteps07@gmail.com",
      pass: "wpalfrmrbrzxkoke",
    },
  });

  var mailOptions = {
    from: "noisysteps07@gmail.com",
    to: email,
    subject: "sending Otp",
    html: `<p>Your OTP: ${otp}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
      // res.json(info)
    }
  });
};

router.put("/resetpasswordd", async (req, res) => {
  try {
    const { otp, password } = req.body;
    // console.log(otp, password);
    const response = await Otp.find({code:otp});
    // console.log(res);
    const email = response[0].email;
    // console.log(email);
    let npassword = await bcrypt.hash(password, 10);
    const x = await User.findOneAndUpdate({u_email:email},{u_password:npassword});
    // console.log(x);
    res.json({x,success:true});
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await User.find({});
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;
