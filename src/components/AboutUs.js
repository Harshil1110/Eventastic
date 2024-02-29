import React from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <div className="wpo-about-area section-padding">
      <Helmet>
        <title>About Us - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 colsm-12">
            <div className="wpo-about-text">
              <div className="wpo-section-title">
                <span>What We Do?</span>
                <h2>Eventastic</h2>
              </div>
              <p>
                is an Indian Event Planning Website and app where you can find
                the best Event vendors, with prices and reviews at the click of
                a button. Whether you are looking to hire Event planners in
                India, or looking for the top photographers, or just some ideas
                and inspiration for your Event. Eventastic can help you to solve
                your Event planning woes through its unique features.With a
                checklist, detailed vendor list, inspiration gallery - you won't
                need to spend hours planning a Event anymore.{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 colsm-12">
            <div className="wpo-about-img">
              <img src="assets/images/ab.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
