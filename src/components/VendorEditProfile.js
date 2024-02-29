import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const VendorEditProfile = () => {
  const [city, setCity] = useState([]);
  const id = localStorage.getItem("vid");
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [category, setCat] = useState([]);
  const [src, setSrc] = useState("");
  const [image, setImage] = useState("");
  const [err, seterr] = useState("");
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    sname: "",
    email: "",
    number: "",
    price: "",
    address: "",
    disc: "",
    city: "",
    event: "",
    category: "",
    logo: src,
  });

  function submitImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "eventastic");
    data.append("cloud_name", "dbyiyifcd");

    axios
      .post("https://api.cloudinary.com/v1_1/dbyiyifcd/image/upload", data)
      .then((res) => {
        setSrc(res.data.url);
        setInputData({ ...inputData, logo: res.data.url });
        console.log(src);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    try {
      axios
        .put(`${url}/vendor/vendoreditprofile/${id}`, inputData)
        .then((res) => {
          // console.log(res);
          alert("Update Successfully :)");
          navigate("/");
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
        });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    axios
      .get(`${url}/vendor/vendoreditprofile/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${url}/vendor/vendorsignup`)
      .then((res) => {
        setCity(res.data[0]);
        setEvents(res.data[1]);
        setCat(res.data[2]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> Edit profile - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="wpo-accountWrapper" onSubmit={handleSubmit}>
              <div className="wpo-accountInfo">
                <div className="wpo-accountInfoHeader">
                  <a href="/">
                    <img src="assets/images/event1.png" alt="" height="100px" />
                  </a>
                  <a className="wpo-accountBtn" href="/login">
                    <span className="">Log in</span>
                  </a>
                </div>
                <div className="image">
                  <img src="assets/images/vision.svg" alt="" />
                </div>
                <div className="back-home">
                  <a className="wpo-accountBtn" href="/">
                    <span className="">Back To Home</span>
                  </a>
                </div>
              </div>
              <div className="wpo-accountForm form-style">
                <div className="fromTitle">
                  <h2>Vendor Edit Profle</h2>
                  <p>Update Vendor Account Here.</p>
                </div>
                {Array(data).map((value) => (
                  <div className="row" key={data._id}>
                    <div className="alert alert-danger" role="alert">
                      {err}
                    </div>

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="Your name here.."
                        defaultValue={value.v_name}
                        onChange={(e) =>
                          setInputData({ ...inputData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Shop Name</label>
                      <input
                        type="text"
                        required
                        id="sname"
                        name="shopname"
                        placeholder="Your Shop name here.."
                        defaultValue={value.v_shop_name}
                        onChange={(e) =>
                          setInputData({ ...inputData, sname: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Email</label>
                      <input
                        type="email"
                        required
                        id="email"
                        name="email"
                        placeholder="Your email here.."
                        defaultValue={value.v_email}
                        onChange={(e) =>
                          setInputData({ ...inputData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Mobile No.</label>
                      <input
                        type="text"
                        required
                        id="num"
                        name="number"
                        placeholder="Your Mobile Number here"
                        defaultValue={value.v_number}
                        onChange={(e) =>
                          setInputData({ ...inputData, number: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Average Pricing</label>
                      <input
                        type="text"
                        required
                        id="avg"
                        name="price"
                        placeholder="Enter your avg price here"
                        defaultValue={value.v_price}
                        onChange={(e) =>
                          setInputData({ ...inputData, price: e.target.value })
                        }
                      />
                    </div>

                    {/* <!--jaate add krelo code--> */}

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Shop Address</label>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          name="address"
                          required
                          placeholder="Enter your shop address here.."
                          id="floatingTextarea"
                          defaultValue={value.v_address}
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              address: e.target.value,
                            })
                          }
                          style={{ height: "100px", resize: "none" }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Description</label>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          name="disc"
                          required
                          placeholder="Enter your Details here.."
                          defaultValue={value.v_disc}
                          onChange={(e) =>
                            setInputData({ ...inputData, disc: e.target.value })
                          }
                          id="floatingTextareadisc"
                          style={{ height: "100px", resize: "none" }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>City</label>
                      <select
                        className="form-select form-select-lg mb-3"
                        required
                        aria-label=".form-select-lg example"
                        name="city"
                        defaultValue={value.v_city}
                        onChange={(e) =>
                          setInputData({ ...inputData, city: e.target.value })
                        }
                        style={{
                          height: "60px",
                          width: "415px",
                          border: "1px solid #e5e5e5",
                          marginBottom: "10px",
                        }}
                      >
                        {city.map((value) => (
                          <option value={value.name} key={value._id}>
                            {value.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Event</label>
                      <select
                        className="form-select form-select-lg mb-3"
                        required
                        aria-label=".form-select-lg example"
                        name="event"
                        defaultValue={value.v_event}
                        onChange={(e) =>
                          setInputData({ ...inputData, event: e.target.value })
                        }
                        style={{
                          height: "60px",
                          width: "415px",
                          border: "1px solid #e5e5e5",
                          marginBottom: "10px",
                        }}
                      >
                        {events.map((value) => (
                          <option
                            value={value.name}
                            key={value._id}
                            name="event"
                          >
                            {value.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Category</label>
                      <select
                        className="form-select form-select-lg mb-3"
                        required
                        aria-label=".form-select-lg example"
                        name="category"
                        defaultValue={value.v_category}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            category: e.target.value,
                          })
                        }
                        style={{
                          height: "60px",
                          width: "415px",
                          border: "1px solid #e5e5e5",
                          marginBottom: "10px",
                        }}
                      >
                        {category.map((value) => (
                          <option
                            value={value.cat_name}
                            key={value._id}
                            name="category"
                          >
                            {value.cat_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Upload the images here</label>
                      <input
                        className="form-control form-control-lg"
                        required
                        name="logo"
                        id="formFileSm1"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ fontSize: "18px" }}
                      />
                    </div>
                    <div
                      onClick={submitImage}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Upload
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <button type="submit" className="wpo-accountBtn">
                        Update
                      </button>
                    </div>
                  </div>
                ))}

                <p className="subText" style={{ marginTop: "20px" }}>
                  Reset Password ? {""}
                  <a href="/resetpassword"> Click Here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VendorEditProfile;
