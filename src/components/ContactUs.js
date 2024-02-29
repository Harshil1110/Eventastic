import React from "react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5000";

const ContactUs = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .post(`${url}/contactus`, inputData)
        .then((res) => {
          // console.log(res);
          alert("Message sent Successfully :)");
          navigate("/");
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
      <section className="wpo-contact-form-map section-padding">
        <Helmet>
          <title> Contact Us - Eventastic</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form
                      method="post"
                      className="contact-validation-active"
                      id="contact-form"
                      onSubmit={handleSubmit}
                    >
                      <div className="clearfix">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="First Name"
                          required
                          onChange={(e) =>
                            setInputData({ ...inputData, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="clearfix">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <textarea
                          className="form-control"
                          type="text"
                          name="note"
                          id="note"
                          placeholder="Message..."
                          required
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                            message: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>

                      <div className="submit-area">
                        <button type="submit" className="theme-btn submit-btn">
                          Send Message
                        </button>
                        <div id="loader">
                          <i className="ti-reload"></i>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="contact-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671"
                      allowfullscreen
                      title="map"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="wpo-contact-info">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="info-item">
                      <h2>Ahmedabad,India</h2>
                      <div className="info-wrap">
                        <div className="info-icon">
                          <i className="ti-world"></i>
                        </div>
                        <div className="info-text">
                          <span>Office Address</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-1 col-sm-6 col-12">
                    <div className="info-item">
                      <h2>eventastic1112@gmail.com</h2>
                      <div className="info-wrap">
                        <div className="info-icon-2">
                          <i className="fi flaticon-envelope"></i>
                        </div>
                        <div className="info-text">
                          <span>Office Mail</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="info-item">
                      <h2>+91 9499977271</h2>
                      <div className="info-wrap">
                        <div className="info-icon-3">
                          <i className="ti-headphone-alt"></i>
                        </div>
                        <div className="info-text">
                          <span>Office Phone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
