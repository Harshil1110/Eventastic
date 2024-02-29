const express = require("express");
const router = new express.Router();
const Contact = require("../models/Contactus");
const cors = require("cors");
router.use(express.json());

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const data = new Contact({
      name: name,
      email: email,
      message: message,
    });
    const contactdata = data.save();
    // console.log(data);
    res.json(contactdata);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Contact.find({});
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
