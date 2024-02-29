import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const ResetPasswordd = () => {
  const navigate = useNavigate();
  const [err, seterr] = useState("");
  const [inputData, setInputData] = useState({
    otp:"",
    password: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .put(`${url}/user/resetpasswordd`, inputData)
        .then((res) => {
          let json = res.data;
          console.log(json);
          if (json.success) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        //   seterr(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> ResetPassword - Eventastic</title>
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
                  <a className="wpo-accountBtn" href="/userSignUp">
                    Create Account
                  </a>
                </div>
                <div className="image">
                  <img src="assets/images/login.svg" alt="" />
                </div>
                <div className="back-home">
                  <a className="wpo-accountBtn" href="/">
                    Back To Home
                  </a>
                </div>
              </div>

              <div className="wpo-accountForm form-style">
                <div className="fromTitle">
                  <h2>Reset Password</h2>
                </div>
                <div className="row">
                  <div className="alert alert-danger" role="alert">
                    {err}
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Enter Otp </label>
                    <input
                      type="password"
                      id="otp"
                      required
                      name="otp"
                      placeholder="Enter your Otp Here"
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          otp: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Enter New Password</label>
                    <input
                      type="password"
                      id="pass"
                      required
                      name="password"
                      placeholder="Enter your New Password"
                      onChange={(e) =>
                        setInputData({ ...inputData, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordd;
