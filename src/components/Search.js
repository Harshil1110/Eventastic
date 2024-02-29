import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";
const Search = () => {
  //   const [data, setData] = useState([]);
  const [vdata, setvData] = useState([]);
  const [inputData, setInpuData] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get(`${url}/user/vendor`)
      .then((res) => {
        console.log(res.data);
        setvData(res.data);
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
      });
  }, []);

  const filteredVendors = vdata.filter((vendor) => {
    return inputData.name === vendor.v_shop_name;
  });

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     // console.log(event);

  //     try {
  //       axios
  //         .post(`${url}/user/search`, inputData)
  //         .then((res) => {
  //           console.log(res.data);
  //           // setData(res.data);
  //         })
  //         .catch((error) => {
  //           console.log("Error:", error.response.data);
  //         });
  //     } catch (error) {
  //       console.log(error.response.data.message);
  //     }
  //   }
  return (
    <div class="wpo-case-area section-padding">
      <Helmet>
        <title> Search - Eventastic</title>
      </Helmet>
      <div>
        <form>
          <div>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Search here..."
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "40px",
                height: "40px",
              }}
              onChange={(e) =>
                setInpuData({ ...inputData, name: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="wpo-section-title">
              <h2>Search Result</h2>
            </div>
          </div>
        </div>

        <div class="row">
          {filteredVendors.length > 0 ? (
            <>
              {filteredVendors.map((value) => (
                <div class="col-md-4 col-sm-6 col-12 custom-grid">
                  <div class="wpo-case-single">
                    <div
                      class="wpo-case-item"
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      <div class="wpo-case-img">
                        <img src={value.v_logo} alt="" height="350px" />
                      </div>
                      <div class="wpo-case-content">
                        <div class="wpo-case-text-top">
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
                              <span>Ratings : </span>4.5/5.0
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <span>City : </span>
                              {value.v_city}
                            </li>
                          </ul>
                        </div>
                        {/* {% if request.session.user_id %} */}
                        {localStorage.getItem("authToken") ? (
                          <div class="case-btn">
                            <ul>
                              <li>
                                <a href={`/detailvendor/${value._id}`}>
                                  More Details
                                </a>
                              </li>
                              <li>
                                <a href={`/shortlist/${value._id}`}>
                                  <i class="fa fa-heart" aria-hidden="true"></i>{" "}
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
            </>
          ) : (
            "There is no vendor available"
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
