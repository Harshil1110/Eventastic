import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider";
const url = "http://localhost:5000";
const Home = () => {
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
    <>
      {/* <div className="preloader">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
  </div> */}

      <Slider />
      <div className="wpo-event-area-2 section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title">
                <h2>Trending Vendors</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {data.map((Value) => (
              <div
                className="col-md-4 col-sm-6 col-12 custom-grid"
                key={Value._id}
              >
                <div className="wpo-event-item">
                  <div className="wpo-event-img">
                    <img
                      src={Value.v_logo}
                      alt=".."
                      height="420px"
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)",
                      }}
                    />
                  </div>

                  <div className="wpo-event-text">
                    <h2>{Value.v_shop_name}</h2>
                    <ul>
                      <li>
                        <i className="fi flaticon-pin"></i>
                        {Value.v_city}
                      </li>
                    </ul>
                    {localStorage.getItem("authToken") || localStorage.getItem("vendorauthToken") ? (
                      <a href={`/detailvendor/${Value._id}`}>View More</a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
