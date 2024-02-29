import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
const url = "http://localhost:5000";
const Dashboard = () => {
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/users",
      name: "Users",
      icon: "bx bxs-group",
    },
    {
      path: "/vendorss",
      name: "Vendors",
      icon: "bx bxs-group",
    },
    {
      path: "/cities",
      name: "Cities",
      icon: "bx bxs-city",
    },
    {
      path: "/events",
      name: "Events",
      icon: "bx bx-calendar-event",
    },
    {
      path: "/categories",
      name: "Categories",
      icon: "bx bx-category",
    },
    {
      path: "/feedbacks",
      name: "Feedbacks",
      icon: "bx bxs-notepad",
    },
    {
      path: "/report",
      name: "Reports",
      icon: "bx bxs-report",
    },
    {
      path: "/contactuss",
      name: "Contact Us",
      icon: "bx bxs-message-alt",
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/user/users`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [vendor, setVendor] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/user/vendor`)
      .then((res) => {
        // console.log(res.data);
        setVendor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("adminauthToken");
    navigate("/adminlogin");
  };
  return (
    <>
      {localStorage.getItem("adminauthToken") ? (
        <>
          <section id="sidebar">
            <Helmet>
              <title> Dashboard - Eventastic</title>
            </Helmet>
            <a href="/" className="brand">
              <i className="bx bxs-smile"></i>
              <span className="text">Eventastic</span>
            </a>
            <ul className="side-menu top">
              <li className="active">
                <a href="/">
                  <i className="bx bxs-dashboard"></i>
                  <span className="text">Dashboard</span>
                </a>
              </li>
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index}>
                  <li>
                    <a>
                      <i className={item.icon}></i>
                      <span className="text">{item.name}</span>
                    </a>
                  </li>
                </NavLink>
              ))}
              <li>
                <a href="/" className="logout">
                  <i className="bx bxs-left-arrow-circle"></i>
                  <span className="text" onClick={handlelogout}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section id="content">
            <nav>
              <i className="bx bx-menu"></i>
            </nav>

            <main>
              <div className="head-title">
                <div className="left">
                  <h1>Dashboard</h1>
                </div>
              </div>

              <ul className="box-info">
                <li>
                  <i className="bx bxs-group"></i>
                  <span className="text">
                    <h3>{data.length}</h3>
                    <p>Users</p>
                  </span>
                </li>
                <li>
                  <i className="bx bxs-group"></i>
                  <span className="text">
                    <h3>{vendor.length}</h3>
                    <p>Vendors</p>
                  </span>
                </li>
              </ul>
            </main>
          </section>
        </>
      ) : (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center",marginTop:"270px", fontSize:"50px"}}>Please Log in.</div>
      )}
    </>
  );
};

export default Dashboard;
