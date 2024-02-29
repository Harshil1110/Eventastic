import React from "react";
import "../Dashboard.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const url = "http://localhost:5000";
const ContactUs = () => {
  const [Cat, setCat] = useState([]);
  const menuItem = [
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
  ];

  useEffect(() => {
    axios
      .get(`${url}/contactus`)
      .then((res) => {
        setCat(res.data);
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
          <li>
            <a href="/cities">
              <i class="bx bxs-city"></i>
              <span class="text">Cities</span>
            </a>
          </li>
          <li>
            <a href="/events">
              <i class="bx bxs-calendar-event"></i>
              <span class="text">Events</span>
            </a>
          </li>
          <li>
            <a href="/categories">
              <i class="bx bxs-category"></i>
              <span class="text">Catagories</span>
            </a>
          </li>
          <li>
            <a href="/feedbacks">
              <i class="bx bxs-notepad"></i>
              <span class="text">Feedbacks</span>
            </a>
          </li>
          <li>
            <a href="/report">
              <i class="bx bxs-report"></i>
              <span class="text">Reports</span>
            </a>
          </li>
          <li className="active">
            <a href="/contactuss">
              <i class="bx bxs-message-alt"></i>
              <span class="text">Contact Us</span>
            </a>
          </li>
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
                <h3>Contact Us</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>message</th>
                  </tr>
                </thead>
                <tbody>
                  {Cat.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.message}</td>
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

export default ContactUs;
