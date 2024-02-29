import React from "react";
import "../Dashboard.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const url = "http://localhost:5000";
const Cities = () => {
  const menuItem = [
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
      path: "/reports",
      name: "Reports",
      icon: "bx bxs-report",
    },
    {
      path: "/contactuss",
      name: "Contact Us",
      icon: "bx bxs-message-alt",
    },
  ];
  const [City, setCity] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/vendor/vendorsignup`)
      .then((res) => {
        setCity(res.data[0]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <div>
      <section id="sidebar">
        <a href="/dashboard" class="brand">
          <i class="bx bxs-smile"></i>
          <span class="text">Eventastic</span>
        </a>
        <ul class="side-menu top">
          <li>
            <a href="/dashboard">
              <i class="bx bxs-dashboard"></i>
              <span class="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/users">
              <i class="bx bxs-group"></i>
              <span class="text">Users</span>
            </a>
          </li>
          <li>
            <a href="/vendorss">
              <i class="bx bxs-group"></i>
              <span class="text">Vendors</span>
            </a>
          </li>
          <li className="active">
            <a href="/cities">
              <i class="bx bxs-city"></i>
              <span class="text">Cities</span>
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
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        <main>
          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>All Cities</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>City_Name</th>
                  </tr>
                </thead>
                <tbody>
                  {City.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Cities;
