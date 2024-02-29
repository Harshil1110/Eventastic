import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const Feedback = () => {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [data, setData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [inputData, setInputData] = useState({
    review: "",
    star: "",
    user_id: `${uid}`,
  });
  const { id } = useParams();

  const handleRating = (rate) => {
    // setRating(rate);
    setInputData({ ...inputData, star: rate });
  };
  //   console.log(rating);
  //   console.log(inputData);
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .post(`${url}/vendor/feedback/${id}`, inputData)
        .then((res) => {
          console.log(res.data);
          alert("Feedback gave successfully :)");
          navigate("/vendors");
        })
        .catch((error) => {
          console.log("Error:", error.response.data);
        });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    axios
      .get(`${url}/vendor/detailvendor/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${url}/user/usereditprofile/${uid}`)
      .then((res) => {
        // console.log(res.data);
        setuserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <center>
        <section className="wpo-blog-single-section">
          <Helmet>
            <title> Feedback - Eventastic</title>
          </Helmet>
          <div className="comment-respond">
            <h3 className="comment-reply-title">Give your Feedback</h3>
            <h4>Review for the </h4>
            <h4>Vendor Name : {data.v_name}</h4>
            <h4>Vendor Shop Name : {data.v_shop_name} </h4>
            <h4>Review from the user : {userData.u_name} </h4>
            <form
              id="commentform"
              className="comment-form"
              onSubmit={handleSubmit}
            >
              <div className="form-textarea">
                <textarea
                  id="comment"
                  placeholder="Write Your Review..."
                  style={{ width: "500px", height: "150px", resize: "none" }}
                  name="content"
                  onChange={(e) =>
                    setInputData({ ...inputData, review: e.target.value })
                  }
                ></textarea>
              </div>
              <label>Ratings : </label>
              {/* <select
                className="form-select form-select-lg mb-3"
                required
                aria-label=".form-select-lg example"
                name="rating"
              >
                <option value="1">1/5</option>
                <option value="2">2/5</option>
                <option value="3">3/5</option>
                <option value="4">4/5</option>
                <option value="5">5/5</option>
              </select> */}
              <div>
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={20}
                  label
                  transition
                  fillColor="orange"
                  emptyColor="gray"
                  className="foo"
                />
                {rating}
              </div>
              <div className="form-submit" style={{ paddingBottom: "20px" }}>
                <input id="submit" value="Submit" type="submit" />
              </div>
            </form>
          </div>
        </section>
      </center>
    </div>
  );
};

export default Feedback;
