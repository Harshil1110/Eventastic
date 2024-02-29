import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const UserEditProfile = () => {
  // const email = localStorage.getItem("userEmail");
  const id = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    number: "",
    gender: "male",
  });
  const [err, seterr] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .put(`${url}/user/usereditprofile/${id}`, inputData)
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
      .get(`${url}/user/usereditprofile/${id}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> Edit profile - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {Array(data).map((value) => (
              <div key={value._id}>
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
                      <h2>User Edit Profile</h2>
                      <p>Update User Account Here.</p>
                    </div>
                    <div className="row">
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
                          defaultValue={value.u_name}
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
                          defaultValue={value.u_email}
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              email: e.target.value,
                            })
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
                          defaultValue={value.u_number}
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              number: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-lg-12 col-md-12 col-12">
                        <label>Gender</label>
                        <select
                          className="form-control form-control-lg"
                          required
                          name="gender"
                          defaultValue={value.u_gen}
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              gender: e.target.value,
                            })
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
                      <div className="col-lg-12 col-md-12 col-12">
                        <button type="submit" className="wpo-accountBtn">
                          Update
                        </button>
                      </div>
                    </div>

                    <p className="subText" style={{ marginTop: "20px" }}>
                      Reset Password ? {""}
                      <a href="/resetpassword"> Click Here</a>
                    </p>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
