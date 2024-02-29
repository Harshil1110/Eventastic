import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("vendorauthToken");
    localStorage.removeItem("vid");
    navigate("/");
  };

  function handle (event) {
    event.preventDefault();
    navigate("/search")
  }
  return (
    <div>
      <header id="header" className="wpo-site-header wpo-header-style-3">
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col col-md-6 col-sm-7 col-12">
                <div className="contact-intro">
                  <ul>
                    <li>
                      <i className="fi flaticon-call"></i>+919499977271
                    </li>
                    <li>
                      <i className="fi flaticon-envelope"></i>{" "}
                      eventastic1112cc@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col col-md-6 col-sm-5 col-12">
                <div className="contact-info">
                  <ul>
                    {!localStorage.getItem("authToken") &&
                    !localStorage.getItem("vendorauthToken") ? (
                      <>
                        <li>
                          <a href="/login">Log-in</a>
                        </li>
                        <li>
                          <a href="/usersignup">Sign Up</a>
                        </li>
                      </>
                    ) : (
                      <li>
                        <div
                          onClick={handlelogout}
                          style={{ cursor: "pointer" }}
                        >
                          Log-out
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navigation navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="open-btn">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a classNam="navbar-brand" href="/">
                <img
                  src="/assets/images/event1.png"
                  alt="logo"
                  height="60px"
                  style={{ marginTop: "20px" }}
                />
              </a>
            </div>
            {!localStorage.getItem("vendorauthToken") ? (
              <>
                <div
                  id="navbar"
                  className="navbar-collapse collapse navbar-right navigation-holder"
                >
                  <button className="close-navbar">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav">
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
                <div className="cart-search-contact">
                  {localStorage.getItem("authToken") ? (
                    <>
                      <div className="mini-cart">
                        <a href="/usereditprofile">
                          <i
                            className="fi flaticon-user"
                            aria-hidden="true"
                            style={{ fontSize: "30px" }}
                          ></i>
                        </a>
                      </div>
                      <div className="mini-cart">
                        <a href="/shortlist/:id">
                          <i
                            className="fi flaticon-shopping-bag"
                            aria-hidden="true"
                            style={{ fontSize: "30px" }}
                          ></i>
                        </a>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <i className="fi flaticon-magnifying-glass" onClick={handle}></i>
                  {/* <div>
                    <button
                      className="search-toggle-btn"
                      onClick={toggleSearchBox}
                    >
                      <i className="fi flaticon-magnifying-glass"></i>
                    </button>
                    {isOpen && (
                      <div style={{ marginTop: "135px" }}>
                        <form onSubmit={handleSubmit}>
                          <div>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Search here..."
                              onChange={(e) => setInpuData({...inputData, name: e.target.value})}
                            />
                            <button type="submit">
                              <i className="fi flaticon-magnifying-glass"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div> */}

                </div>
              </>
            ) : (
              <div
                id="navbar1"
                className="navbar-collapse collapse navbar-right navigation-holder"
                style={{ marginTop: "25px" }}
              >
                <ul className="nav navbar-nav">
                  <li>
                    <a href="/vendordashboard">Dashboard</a>
                  </li>
                  <li>
                    <a href="/vendoreditprofile">Edit Profile</a>
                  </li>
                  <li>
                    <a href="/uploadimage">Upload Image</a>
                  </li>
                  <li>
                    <a href="/aboutus">About Us</a>
                  </li>
                  <li>
                    <a href="/contactus">Contact Us</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
