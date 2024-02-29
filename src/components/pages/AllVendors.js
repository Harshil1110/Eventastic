import React from "react";
import "../Dashboard.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const url = "http://localhost:5000";
const AllVendors = () => {
  const menuItem = [
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
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/user/vendor`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
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
          <li className="active">
            <a href="/vendorss">
              <i class="bx bxs-group"></i>
              <span class="text">Vendors</span>
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
                <h3>All Vendors</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Shop Name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>EVent</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.v_name}</td>
                      <td>{value.v_email}</td>
                      <td>{value.v_number}</td>
                      <td>{value.v_shop_name}</td>
                      <td>{value.v_city}</td>
                      <td>{value.v_address}</td>
                      <td>{value.v_event}</td>
                      <td>{value.v_category}</td>
                      <td><p style={{height:"80px", overflowY:"auto", fontSize:"12px"}}>{value.v_disc}</p></td>
                      <td>{value.v_price}</td>
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

export default AllVendors;
