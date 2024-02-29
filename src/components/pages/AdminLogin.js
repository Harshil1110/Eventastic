import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5000";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [err, seterr] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    axios
      .post(`${url}/adminlogin`, inputData)
      .then((res) => {
        let json = res.data;
        console.log(json);
        if (json.success !== "true") {
            seterr(json.errors);
        }
        if (json.success) {
          localStorage.setItem("adminauthToken", json.authToken);
          console.log(localStorage.getItem("adminauthToken"));
          localStorage.setItem("aid", json.id);
          alert("Login Sucessfully :)");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("Error:", error.response.status);
      });
  }
  return (
    <div className="body">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12">
              <img
                src="assets/images/event1.png"
                alt="logo"
                height="90px"
                style={{ marginTop: "40px" }}
              />
            </div>
            <div class="col-lg-12 login-title">ADMIN PANEL</div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label class="form-control-label">EMAIL</label>
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      required
                      onChange={(e) =>
                        setInputData({ ...inputData, email: e.target.value })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      required
                      onChange={(e) =>
                        setInputData({ ...inputData, password: e.target.value })
                      }
                    />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text">{err}</div>
                    <div class="col-lg-6 login-btm login-button">
                      <button type="submit" class="btn btn-outline-primary">
                        LOGIN
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
