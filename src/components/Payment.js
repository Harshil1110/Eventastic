import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Payment = () => {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    var options = {
      key: "rzp_test_PcFut4Ph5iGCXi",
      key_secret: "IbDHhEwcLbkPnvWNZxdcb9rr",
      amount: 999 * 100,
      currency: "INR",
      name: "Eventastic",
      description: "Registration Feees",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        navigate("/login");
      },
      prefill: {
        name: "Dummy",
        email: "demo@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }
  return (
    <div className="wpo-case-area section-padding">
      <Helmet>
        <title> Payment - Eventastic</title>
      </Helmet>
      <div className="col-lg-12 col-md-12 col-12">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className="wpo-accountBtn"
            onClick={handleSubmit}
            style={{
              height: "50px",
              width: "200px",
              fontSize: "20px",
              border: "none",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.60)",
            }}
          >
            <b>Pay 999₹ /-</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
