import React, { useEffect, useState } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
const url = "http://localhost:5000";

const Vendors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/vendor`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="wpo-case-area section-padding">
      <Helmet>
        <title> Vendors - Eventastic</title>
      </Helmet>
      <div className="container">
        {/* <div className="row">
            <div className="col-12">
                <div className="wpo-section-title">
                    <h2>Filters</h2>
                </div>
            </div>
        </div>

        <div className="wpo-case-text-top">
            <ul style="list-style-type:none">
                <li><span>Select your Event : </span></li>

                {% for event in event %}
                <li><a href="/viewVendors/?event={{event.e_id}}"> <i className="fa fa-angle-double-right"
                                                                     aria-hidden="true"></i> {{event.e_name}}</a></li>
                {% endfor %}

            </ul>

            <ul style="list-style-type:none">
                <li><span>Select your Category : </span></li>

                {% for cat in cat %}
                <li><a href="/viewVendors/?cat={{cat.cat_id}}"> <i className="fa fa-angle-double-right"
                                                                   aria-hidden="true"></i> {{cat.cat_name}}</a></li>
                {% endfor %}

            </ul>

            <ul style="list-style-type:none">
                <li><span>Select your City : </span></li>

                {% for city in city %}
                <li><a href="/viewVendors/?city={{city.c_id}}"> <i className="fa fa-angle-double-right"
                                                                   aria-hidden="true"></i> {{city.c_name}}</a></li>
                {% endfor %}

            </ul>

        </div> */}

        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title">
              <h2>Vendors</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {data.map((value) => (
            <div
              className="col-md-4 col-sm-6 col-12 custom-grid"
              key={value._id}
            >
              <div className="wpo-case-single">
                <div className="wpo-case-item">
                  <div className="wpo-case-img">
                    <img src={value.v_logo} alt="" height="420px" />
                  </div>
                  <div className="wpo-case-content">
                    <div className="wpo-case-text-top">
                      <h2>{value.v_shop_name}</h2>
                      <ul>
                        <li>
                          <span>Event : </span>
                          {value.v_event}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <span>Category : </span>
                          {value.v_category}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <span>Avg Price : </span>
                          {value.v_price}
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <span>City : </span>
                          {value.v_city}
                        </li>
                      </ul>
                    </div>
                    {localStorage.getItem("authToken") ? (
                      <div className="case-btn">
                        <ul>
                          <li>
                            {/* <a href={`/detailvendor/${value._id}`}> */}
                            <a href={`/detailvendor/${value._id}`}>
                              More Details
                            </a>
                          </li>
                          <li>
                            <a href={`/shortlist/${value._id}`}>
                              <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                              Shortlist
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
