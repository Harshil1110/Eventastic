const express = require("express");
const router = new express.Router();
const Vendor = require("../models/Vendors");
const Images = require("../models/Uploadimages");
const Shortlist = require("../models/Shortlistt");
const Feedback = require("../models/Feedback");
const Report = require("../models/Report");
const User = require("../models/User");
const cors = require("cors");
router.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "mynamaisharshilranaandiamasoftweredeveloper";
const {useParams} = require('react-router-dom');

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/vendorsignup", async (req, res) => {
  try {
    res.send([global.city, global.events, global.category]);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/vendorsignup", async (req, res) => {
  try {
    // console.log(req.body);
    const registerVendor = await new Vendor({
      v_name: req.body.name,
      v_shop_name: req.body.sname,
      v_email: req.body.email,
      v_number: req.body.number,
      v_price: req.body.price,
      v_address: req.body.address,
      v_disc: req.body.disc,
      v_city: req.body.city,
      v_event: req.body.event,
      v_category: req.body.category,
      v_logo: req.body.logo,
      v_password: req.body.password,
    });
    const registered = await registerVendor.save();

    // console.log(registered);
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

    let vendordata = await Vendor.findOne({ v_email: email });
    // console.log(vendordata);
    // console.log(vendordata.id);
    if (!vendordata) {
      return res.json({ error: "Try login with correct credentials." });
    }
    const pwdcompare = await bcrypt.compare(password, vendordata.v_password);
    // console.log(pwdcompare);
    if (!pwdcompare && email) {
      return res
        .status(400)
        .json({ errors: "Try login with correct credentials" });
    }
    const data = {
      user: {
        id: vendordata.id,
      }
    };
    const authToken = jwt.sign(data, jwtsecret);
    return res.json({ success: true, authToken: authToken, id: vendordata.id });
  } catch (error) {
    res.status(404).send(error);
    res.json({ sucess: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Vendor.find({});
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})
router.get("/detailvendor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Vendor.findById(id);
    const image = await Images.find({v_id:id});
    const img = image[0].v_images[0];
    // console.log(img);
    // console.log(data);
    res.json({data,img});
    // res.json(image);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})
router.get("/vendordashboard/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Vendor.findById(id);
    const image = await Images.find({v_id:id});
    const img = image[0].v_images[0];
    res.json({data,img});
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

router.post("/uploadimage", async (req, res) => {
  try {
    // console.log(req.body);
    const uploadimage = await new Images({
      v_id: req.body.id,
      v_images: [req.body.Links]
    });
    const uploaded = await uploadimage.save();

    // console.log(registered);
    res.json(uploaded);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/deletevendor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await Shortlist.findOneAndDelete({vendor_id:id});
    // console.log(data)
    res.json({message: "Remove successfully."});
  } catch (error) {
    res.status(404).send(error);
  }
});


router.post("/feedback/:id", async (req, res) => {
  try {
    // console.log(req.params.id)
    // console.log(req.body);
    const data = new Feedback({
      f_content : req.body.review,
      f_rating :  req.body.star,
      user_id : req.body.user_id,
      vendor_id: req.params.id
    });
    const uploaded = await data.save();

    // console.log(data);
    res.json(uploaded);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/report/:id", async (req, res) => {
  try {
    // console.log(req.params.id)
    // console.log(req.body);
    const data = new Report({
      r_reason :  req.body.reason,
      user_id : req.body.user_id,
      vendor_id: req.params.id
    });
    const uploaded = await data.save();

    // console.log(data);
    res.json(uploaded);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/feedback/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Feedback.find({vendor_id:id});
    const user = await User.find({id:data.user_id});
    // console.log(data);
    // console.log(user);
    res.json({data,user});
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
})

router.get("/vendoreditprofile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await Vendor.findById(id);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/vendoreditprofile/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  const { name, sname, email, number, price, address, disc, city, event, category, logo } = req.body;
  try {
    const vendor = await Vendor.findById(id);

    if (name && name !== vendor.v_name) {
      vendor.v_name = name;
    }
    if (sname && sname !== vendor.v_shop_name) {
      vendor.v_shop_name = sname;
    }
    if (email && email !== vendor.v_email) {
      vendor.v_email = email;
    }
    if (number && number !== vendor.v_number) {
      vendor.v_number = number;
    }
    if (price && price !== vendor.v_price) {
      vendor.v_price = price;
    }
    if (address && address !== vendor.v_address) {
      vendor.v_address = address;
    }
    if (disc && disc !== vendor.v_disc) {
      vendor.v_disc = disc;
    }
    if (city && city !== vendor.v_city) {
      vendor.v_city = city;
    }
    if (event && event !== vendor.v_event) {
      vendor.v_event = event;
    }
    if (category && category !== vendor.v_category) {
      vendor.v_category = category;
    }
    if (logo && logo !== vendor.v_logo) {
      vendor.v_logo = logo;
    }

    const updatedUser = await vendor.save();
    // console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
