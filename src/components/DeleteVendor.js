import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const url = "http://localhost:5000";

const DeleteVendor = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .delete(`${url}/vendor/deletevendor/${id}`)
      .then((res) => {
        alert(res.data.message);
        navigate("/shortlist/:");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <></>;
};

export default DeleteVendor;
