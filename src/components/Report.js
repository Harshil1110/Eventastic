import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";

const Report = () => {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [inputData, setInputData] = useState({
    reason: "",
    user_id: `${uid}`,
  });
  const { id } = useParams();
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    try {
      axios
        .post(`${url}/vendor/report/${id}`, inputData)
        .then((res) => {
          console.log(res.data);
          alert("Reported successfully :)");
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
    <center>
      <section class="wpo-blog-single-section">
        <Helmet>
          <title> Report - Eventastic</title>
        </Helmet>
        <div class="comment-respond">
          <h3 class="comment-reply-title">Reporting </h3>
          <h4>Vendor Name : {data.v_name}</h4>
          <h4>Vendor Shop Name : {data.v_shop_name}</h4>
          <h4>By the user : {userData.u_name}</h4>
          <form id="commentform" class="comment-form" onSubmit={handleSubmit}>
            <div class="form-textarea">
              <textarea
                id="comment"
                placeholder="Write Your reason to report this Vendor"
                style={{ width: "500px", height: "150px", resize: "none" }}
                required
                name="reason"
                onChange={(e) =>
                  setInputData({ ...inputData, reason: e.target.value })
                }
              ></textarea>
            </div>
            <div class="form-submit" style={{ paddingBottom: "20px" }}>
              <input id="submit" value="Submit" type="submit" />
            </div>
          </form>
        </div>
      </section>
    </center>
  );
};

export default Report;
