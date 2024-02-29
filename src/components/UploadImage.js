import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const url = "http://localhost:5000";
const UploadImage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImage] = useState([]);
  const [Links, setLink] = useState([]);
  const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eventastic");
    formData.append("cloud_name", "dbyiyifcd");

    const {data} = await axios.post("https://api.cloudinary.com/v1_1/dbyiyifcd/image/upload", formData)
    return {url:data?.secure_url}
  };
  const submitImage = async (event) => {
    event.preventDefault();
    try {
      let arr = [];
      setLoading(true);
      for (let i = 0; i < images.length; i++) {
        const data = await uploadCloudinary(images[i]);
        arr.push(data);
      }
      setLoading(false);
      setLink(arr);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    let id = localStorage.getItem("vid");

    try {
      axios
        .post(`${url}/vendor/uploadimage`, {id,Links})
        .then((res) => {
          console.log(res);
          alert("Upload Successfully :)");
          navigate("/");
        })
        .catch((error) => {
          console.log("Error:", error.response.message);
        });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="wpo-login-area">
      <Helmet>
        <title> Upload Images - Eventastic</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="wpo-accountWrapper" onSubmit={handleSubmit}>
              {/* <div className="wpo-accountInfo">
                <div className="wpo-accountInfoHeader">
                  <a href="/">
                    <img src="assets/images/event1.png" alt="" height="100px" />
                  </a>
                  <a className="wpo-accountBtn" href="/login">
                    <span className="">Log in</span>
                  </a>
                </div>
                <div className="image">
                  <img src="assets/images/vision.svg" alt="" />
                </div>
                <div className="back-home">
                  <a className="wpo-accountBtn" href="/">
                    <span className="">Back To Home</span>
                  </a>
                </div>
              </div> */}
              <div className="wpo-accountForm form-style">
                <div className="fromTitle">
                  <h2>Upload Image </h2>
                  <p> Upload Images for your gallery</p>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Upload the images here</label>
                    <input
                      className="form-control form-control-lg"
                      required
                      name="logo"
                      multiple={true}
                      type="file"
                      onChange={(e) => setImage(e.target.files)}
                      style={{ fontSize: "18px" }}
                    />
                  </div>
                  <div
                    onClick={submitImage}
                    style={{ cursor: "pointer", color: "red" }}
                    aria-disabled={loading} 
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
