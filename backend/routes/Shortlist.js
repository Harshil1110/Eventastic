const express = require("express");
const router = new express.Router();
const Shortlist = require("../models/Shortlist");
const Vendor = require("../models/Vendors");
const cors = require("cors");
router.use(express.json());

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
router.post('/:email', async (req, res) => {
  try {
    console.log(req.body);
    // const email = req.params.email;
    // console.log(email);
    // const data = await Vendor.findOne({v_email:email});
    // console.log(data);
    // res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;