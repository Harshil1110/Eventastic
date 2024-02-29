import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";
const Shortlist = () => {
  const { id } = useParams();
  // console.log(id);
  const [vendorData, setvendorData] = useState([]);
  const [shortlistData, setShortlistData] = useState([]);
  const [Event, setEvent] = useState([]);
  const userid = localStorage.getItem("uid");
  useEffect(() => {
    axios
      .post(`${url}/user/shortlist/${id}`, { userid })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${url}/user/shortlist/${userid}`)
      .then((res) => {
        setvendorData(res.data.data);
        setShortlistData(res.data.vdata);
        setEvent(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("vendordata:", vendorData);
  console.log("Shorlist data", shortlistData);

  const filteredVendors = vendorData.filter((vendor) => {
    return shortlistData.some((item) => item.vendor_id === vendor._id);
  });
  const filteredEvents = Event.filter((vendor) => {
    return shortlistData.some((item) => item.event_name === vendor.name);
  });
  // console.log("events:",filteredEvents);
  console.log("filtervendors:", filteredVendors);
  return (
    <div className="wpo-case-area section-padding">
      <Helmet>
        <title> Shorlist - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="case-btn">
          <ul style={{ listStyle: "none" }}>
            <li>
              <a href="/vendors">Looking for more vendors click here</a>
            </li>
          </ul>
        </div>
        {/* {filteredEvents.map((value) => ( */}
        {/* <> */}
        <div className="row" style={{ paddingTop: "40px" }}>
          <div className="col-12">
            <div className="wpo-section-title">
              <h2>Shortlisted Vendor</h2>
            </div>
          </div>
        </div>

        {filteredVendors.length > 0 ? (
          <div className="row">
            {filteredVendors.map((vendor) => (
              <div
                className="col-md-4 col-sm-6 col-12 custom-grid"
                key={vendor.vendor_id}
              >
                <div className="wpo-case-single">
                  <div className="wpo-case-item">
                    <div className="wpo-case-img">
                      <img src={vendor.v_logo} alt="" height="400px" />
                    </div>
                    <div className="wpo-case-content">
                      <div className="wpo-case-text-top">
                        <h2>{vendor.v_shop_name}</h2>
                        <ul>
                          <li>
                            <span>Event : </span>
                            {vendor.v_event}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>Category : </span>
                            {vendor.v_category}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>Avg Price : </span>
                            {vendor.v_price}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>Ratings : </span>4.5/5.0
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>City : </span>
                            {vendor.v_city}
                          </li>
                        </ul>
                      </div>
                      <div className="case-btn">
                        <ul>
                          <li>
                            <a href={`/deletevendor/${vendor._id}`}>
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>{" "}
                              Remove
                            </a>
                          </li>
                          <li>
                            <a href={`/detailvendor/${vendor._id}`}>
                              More Details
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
};

export default Shortlist; 
