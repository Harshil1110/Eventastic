import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const url = "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [choice, setChoice] = useState("user");
  console.log(choice);
  const [err, seterr] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    try {
      if (choice === "user") {
        axios
          .post(`${url}/user/login`, inputData)
          .then((res) => {
            let json = res.data;
            if (!json.success) {
              seterr(res.data.error);
            }
            if (json.success) {
              localStorage.setItem("authToken", json.authToken);
              localStorage.setItem("userEmail", inputData.email);
              console.log(localStorage.getItem("authToken"));
              console.log(localStorage.getItem("userEmail"));
              localStorage.setItem("uid", json.id);
              alert("Login Sucessfully :)");
              navigate("/");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        axios
          .post(`${url}/vendor/login`, inputData)
          .then((res) => {
            let json = res.data;
            if (!json.success) {
              seterr(res.data.error);
            }
            if (json.success) {
              localStorage.setItem("vendorauthToken", json.authToken);
              //   localStorage.setItem("userEmail", inputData.email);
              console.log(localStorage.getItem("vendorauthToken"));
              //   console.log(localStorage.getItem("userEmail"));
              localStorage.setItem("vid", json.id);
              console.log(localStorage.getItem("vid"));
              alert("Login Sucessfully :)");
              navigate("/");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> Login - Eventastic</title>
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
                  <a className="wpo-accountBtn" href="/usersignup">
                    <span className="">Create Account</span>
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
                  <h2>Login</h2>
                  <p>Login into your account</p>
                </div>
                <div className="row">
                  <div className="alert alert-danger" role="alert">
                    {err}
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Are you a user or vendor?</label>
                    <select
                      className="form-control form-control-lg"
                      required
                      name="choice"
                      onChange={(e) => setChoice(e.target.value)}
                      style={{
                        height: "60px",
                        width: "415px",
                        border: "1px solid #e5e5e5",
                        marginBottom: "10px",
                      }}
                    >
                      <option value="user" name="choice">
                        User
                      </option>
                      <option value="vendor" name="choice">
                        Vendor
                      </option>
                    </select>
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder=""
                      onChange={(e) =>
                        setInputData({ ...inputData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="pwd6"
                        type="password"
                        placeholder=""
                        name="password"
                        style={{marginBottom:"-50px"}}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-default reveal6" type="button">
                        <i className="glyphicon glyphicon-eye-open"></i>
                      </button>
                    </span>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="check-box-wrap">
                      <div className="forget-btn">
                        <a href="/forgotpassword">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      Login
                    </button>
                  </div>
                </div>

                <p className="subText" style={{ marginTop: "20px" }}>
                  Don't have an account?{" "}
                  <a href="/usersignup">Create an account</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
