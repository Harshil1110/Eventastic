import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const ResetPassword = () => {
  const id = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [err, seterr] = useState("");
  const [inputData, setInputData] = useState({
    password: "",
    opassword: "",
    cpassword: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      if (inputData.password === inputData.cpassword) {
        axios
          .put(`${url}/user/resetpassword/${id}`, inputData)
          .then((res) => {
            let json = res.data;
            if (json.sucess) {
              alert("Password Updated Successfully :)");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log("Error:", error.response.data.errors);
            seterr(error.response.data.errors);
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
                    <label>Enter Old Password</label>
                    <input
                      type="password"
                      id="pass1"
                      required
                      name="opassword"
                      placeholder="Enter your Old Password"
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          opassword: e.target.value,
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
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      id="pass2"
                      required
                      name="cpassword"
                      placeholder="Re Enter your New Password"
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          cpassword: e.target.value,
                        })
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

export default ResetPassword;
