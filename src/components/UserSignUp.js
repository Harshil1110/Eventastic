import React from "react";
import { useState } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5000";
const UserSignUp = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    number: "",
    gender: "male",
    password: "",
    cpassword: "",
  });
  const [err, seterr] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      let password = inputData.password;
      let cpassword = inputData.cpassword;

      if (password === cpassword) {
        axios
          .post(`${url}/user/usersignup`, inputData)
          .then((res) => {
            console.log(res);
            alert("Registration Successfully :)");
            navigate("/login");
          })
          .catch((error) => {
            console.log("Error:", error.response.message);
          });
      } else {
        seterr("Password Mismatch");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> Sign Up - Eventastic</title>
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
                  <h2>User Signup</h2>
                  <p>Create User Account Here.</p>
                </div>
                <div className="row">
                  <div className="alert alert-danger" role="alert">
                    {err}
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <label for="name">Full Name</label>
                    <input
                      type="text"
                      required
                      id="name"
                      name="name"
                      placeholder="Your name here.."
                      onChange={(e) =>
                        setInputData({ ...inputData, name: e.target.value })
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
                      onChange={(e) =>
                        setInputData({ ...inputData, number: e.target.value })
                      }
                    />
                  </div>
                  {/* <!--jaate add krelo code--> */}

                  {/* <div className="col-lg-12 col-md-12 col-12">
                    <label>City</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      required
                      aria-label=".form-select-lg example"
                      name="city"
                      style={{height:"60px", width:"415px", border:"1px solid #e5e5e5", marginBottom:"10px"}}
                    >
                      <option value="abd">Ahmedabad</option>
                    </select>
                  </div> */}

                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Gender</label>
                    <select
                      className="form-control form-control-lg"
                      required
                      name="gender"
                      onChange={(e) =>
                        setInputData({ ...inputData, gender: e.target.value })
                      }
                      style={{
                        height: "60px",
                        width: "415px",
                        border: "1px solid #e5e5e5",
                        marginBottom: "10px",
                      }}
                    >
                      <option value="male" name="gender">
                        Male
                      </option>
                      <option value="female" name="gender">
                        Female
                      </option>
                    </select>
                  </div>
                  {/* <!--end jaate krelo code--> */}

                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="pwd2"
                        type="password"
                        required
                        placeholder="Your password here.."
                        name="password"
                        style={{marginBottom:"-30px"}}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-default reveal3" type="button">
                        <i className="glyphicon glyphicon-eye-open"></i>
                      </button>
                    </span>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        className="pwd3"
                        type="password"
                        required
                        placeholder="Your password here.."
                        name="cpassword"
                        style={{marginBottom:"-20px"}}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            cpassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-default reveal2" type="button">
                        <i className="glyphicon glyphicon-eye-open"></i>
                      </button>
                    </span>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      Signup
                    </button>
                  </div>
                </div>

                <p className="subText" style={{ marginTop: "20px" }}>
                  Are you a Vendor? {" "}
                  <a href="/vendorsignup">Register yourself here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
