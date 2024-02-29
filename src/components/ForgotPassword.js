import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:5000";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
  });
  const [err, seterr] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .post(`${url}/user/forgotpassword`, inputData)
        .then((res) => {
          console.log(res.status);
          if(res.status == "200"){
            seterr(res.data.message);
          }
          alert("Please check your email for otp");
          navigate("/resetpasswordd");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="wpo-login-area">
        <Helmet>
          <title> Forgot Password - Eventastic</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form className="wpo-accountWrapper" onSubmit={handleSubmit}>
                <div className="wpo-accountInfo">
                  <div className="wpo-accountInfoHeader">
                    <a href="/">
                      <img
                        src="assets/images/event1.png"
                        alt=""
                        height="100px"
                      />
                    </a>
                    <a className="wpo-accountBtn" href="/usersignup">
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
                    <h2>Forgot Password</h2>
                  </div>
                  <div className="row">
                    <div className="alert alert-danger" role="alert">
                      {err}
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label>Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        placeholder="Your email here.."
                        onChange={(e) =>
                          setInputData({ email: e.target.value })
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
    </div>
  );
};

export default ForgotPassword;
