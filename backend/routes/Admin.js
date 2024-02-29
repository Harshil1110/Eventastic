const express = require("express");
const router = new express.Router();
const Admin = require("../models/Admin");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtsecret = "mynamaisharshilranaandiamasoftweredeveloper";
router.use(express.json());
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const Vendor = require("../models/Vendors");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email);
    // console.log(password);
    const admindata = await Admin.find({email});
    // console.log(admindata);

    if (password !== admindata[0].password) {
      return res.json({ errors: "Try login with correct credentials" });
    }
    const data = {
      admin: {
        id: admindata._id,
      },
    };
    const authToken = jwt.sign(data, jwtsecret);
    return res.json({ success: true, authToken: authToken, id: admindata._id });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/feedbacks", async (req, res) => {
  const feedback = await Feedback.find({});
  // console.log(feedback);
  const users = await User.find({});
  // console.log(users);
  const vendors = await Vendor.find({});
  // console.log(vendors);
  res.json({feedback,users,vendors});

})

module.exports = router;
