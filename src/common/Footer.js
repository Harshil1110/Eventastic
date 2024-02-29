import React from "react";

const Footer = () => {
  return (
    <div className="wpo-ne-footer" style={{ paddingTop: "100px" }}>
      <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-3 col-md-3 col-sm-6">
                <div className="widget about-widget">
                  <div className="logo widget-title">
                    <img
                      src="/assets/images/event1.png"
                      height="75px"
                      alt="blog"
                    />
                  </div>
                  <p>
                    Build and Earn with your online store with lots of cool and
                    exclusive wpo-features.
                  </p>
                  <ul>
                    <li>
                      <a href="/">
                        <i className="ti-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="ti-twitter-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="ti-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="ti-google"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col col-lg-2 col-md-3 col-sm-6">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/vendors">Vendors</a>
                    </li>
                    <li>
                      <a href="/aboutus">About Us</a>
                    </li>
                    <li>
                      <a href="/contactus">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-lg-3 col-lg-offset-1 col-md-3 col-sm-6">
                <div className="widget market-widget wpo-service-link-widget">
                  <div className="widget-title">
                    <h3>Contact </h3>
                  </div>
                  <div className="contact-ft">
                    <ul>
                      <li>
                        <i className="fi flaticon-pin"></i>BBC Market,Ahmedabad
                      </li>
                      <li>
                        <i className="fi flaticon-call"></i>+919499977271
                      </li>
                      <li>
                        <i className="fi flaticon-envelope"></i>
                        eventastic1112cc@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col-lg-2 col-md-3 col-sm-6">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Top cities</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="/">Ahmedabad</a>
                    </li>
                    <li>
                      <a href="/">Surat</a>
                    </li>
                    <li>
                      <a href="/">Mumbai</a>
                    </li>
                    <li>
                      <a href="/">Pune</a>
                    </li>
                    <li>
                      <a href="/">Delhi</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col col-xs-12">
                <p className="copyright">
                  &copy; 2023 Eventastic. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
