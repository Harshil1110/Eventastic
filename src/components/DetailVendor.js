import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { useNavigate } from "react-router-dom";

const url = "http://localhost:5000";

const DetailVendor = () => {
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [Feedback, setFeedback] = useState([]);
  const [user, setUser] = useState([]);
  const [rating, setAverageRating] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${url}/vendor/detailvendor/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        // console.log(res.data.image);
        setData(res.data.data);
        setImg(res.data.img);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`${url}/vendor/feedback/${id}`)
      .then((res) => {
        console.log(res.data);
        setFeedback(res.data.data);
        setUser(res.data.user);
        const totalRating = res.data.data.length;
        const sumRating = res.data.data.reduce(
          (sum, feedback) => sum + parseInt(feedback.f_rating),
          0
        );
        const avgRating = sumRating / totalRating;

        // Set the average rating state
        setAverageRating(avgRating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(user);
  return (
    <div className="wpo-event-details-area section-padding">
      <Helmet>
        <title> Details - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col col-md-7">
            <div className="wpo-event-item">
              <div className="wpo-event-img">
                <img src={data.v_logo} alt="" height="600px" />
              </div>
              <div className="wpo-event-details-text">
                <h1>{data.v_shop_name}</h1>
                <div className="wpo-case-text-top">
                  <ul>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Event : </span>
                      {data.v_event}
                    </li>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Category : </span>
                      {data.v_category}
                    </li>
                  </ul>
                  <ul>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Avg Price : </span>
                      {data.v_price}
                    </li>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Ratings : </span>
                      {rating}/5
                    </li>
                  </ul>
                  <ul>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>City : </span>
                      {data.v_city}
                    </li>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Handled By : </span>
                      <i>{data.v_name}</i>
                    </li>
                  </ul>
                  <ul>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>
                        Shortlisted By :{" "}
                      </span>
                      {4} Users
                    </li>
                    <li style={{ fontSize: "20px" }}>
                      <span style={{ fontSize: "25px" }}>Total : </span>{" "}
                      {Feedback.length} Reviews
                    </li>
                  </ul>
                </div>
              </div>

              <div className="wpo-event-details-wrap">
                <div className="wpo-event-details-tab">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a data-toggle="tab" href="#Schedule">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#Contact">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="wpo-event-details-content">
                  <div className="tab-content">
                    <div id="Schedule" className="tab-pane active">
                      <p>{data.v_disc}</p>
                    </div>
                    <div id="Contact" className="tab-pane">
                      <div className="wpo-case-text-top">
                        <ul>
                          <li style={{ fontSize: "20px" }}>
                            <span style={{ fontSize: "25px" }}>
                              Contact Person :{" "}
                            </span>
                            {data.v_name}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ fontSize: "20px" }}>
                            <span style={{ fontSize: "25px" }}>
                              Contact No :{" "}
                            </span>
                            {data.v_number}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ fontSize: "20px" }}>
                            <span style={{ fontSize: "25px" }}>
                              Location :{" "}
                            </span>
                            {data.v_address}
                          </li>
                        </ul>
                        <ul>
                          <li style={{ fontSize: "20px" }}>
                            <span style={{ fontSize: "25px" }}>City : </span>
                            {data.v_city}
                          </li>
                        </ul>
                      </div>
                    </div>
                    {!localStorage.getItem("vendorauthToken") ? (
                      <>
                        <div className="case-btn">
                          <ul style={{ listStyle: "none" }}>
                            <li>
                              <a href={`/shortlist/${data._id}`}>
                                <i
                                  className="fa fa-heart"
                                  aria-hidden="true"
                                ></i>{" "}
                                Shortlist
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="case-btn">
                          <ul style={{ listStyle: "none" }}>
                            <li>
                              <a href={`/feedback/${data._id}`}>
                                <i
                                  className="fa fa-pencil-square"
                                  aria-hidden="true"
                                ></i>{" "}
                                Write a Review and give your feedback
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="case-btn">
                          <ul style={{ listStyle: "none" }}>
                            <li>
                              <a href={`/report/${data._id}`}>
                                <i className="fa fa-ban" aria-hidden="true"></i>{" "}
                                Report this Vendor
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <section className="wpo-blog-pg-section section-padding">
              <h2>Reviews</h2>
              {Feedback.length > 0 ? (
                <>
                  {Feedback.map((value) => (
                    <div className="wpo-wpo-blog-content">
                      <div className="post format-quote">
                        <div className="wpo-case-text-top">
                          <ul>
                            <li style={{ fontSize: "20px" }}>
                              <span style={{ fontSize: "25px" }}>
                                By{" "}
                                {
                                  user.find((u) => u._id === value.user_id)
                                    ?.u_name
                                }
                              </span>
                            </li>
                          </ul>
                        </div>

                        <p>{value.f_content} </p>
                        <p>
                          <span style={{ fontSize: "20px" }}>Ratings : </span>
                          <strong>
                            {Array.from({
                              length: parseInt(value.f_rating),
                            }).map((_, starIndex) => (
                              <i
                                key={starIndex}
                                className="fa fa-star"
                                aria-hidden="true"
                              ></i>
                            ))}
                          </strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div>There are no reviews for this vendor</div>
              )}
            </section>
          </div>

          <div className="col col-md-5">
            {/* <!--image show--> */}
            <div className="wpo-blog-sidebar">
              <div className="widget recent-post-widget">
                <h3 style={{ textAlign: "center", fontSize: "25px" }}>
                  Gallery
                </h3>
                <div className="posts">
                  {img.map((image, index) => (
                    <div className="post" key={index}>
                      <center>
                        <img
                          src={image.url}
                          alt="image"
                          height="300px"
                          width="300px"
                        />
                      </center>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVendor;
