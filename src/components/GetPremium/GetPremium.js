import React, { useEffect } from "react";
import "./GetPremium.css";
import apiClient from "../../api/apiClient";
import { Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const GetPremium = () => {
  const location = useLocation();
  console.log("Location:", location);
  const queryParams = new URLSearchParams(location.search);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const status = queryParams.get("status");
      if (status === "success") {
        setMessage("Payment successful! Thank you for upgrading to Premium.");
      } else if (status === "cancel") {
        setMessage("Payment failed. Please try again or contact support.");
      }
      const user = await apiClient.get("/api/get_user");
      console.log("User:", user);
      if (user.user_info.Status === "VIP") {
        localStorage.setItem("role", "VIP");
        setRole("VIP");
      } else {
        localStorage.setItem("role", "USER");
        setRole("USER");
      }
    };
    checkPaymentStatus();
  }, [queryParams]);

  const handleUpgradeClick = async () => {
    const accessToken = localStorage.getItem("token");
    window.location.href = `https://apiedusmart.pythonanywhere.com/create_payment?access_token=${accessToken}`;
  };

  return (
    <div className="get-premium-container">
      <div className="premium-card">
        {role === "VIP" ? (
          <h1 className="H1Premium">You are already a Premium Member</h1>
        ) : (
          <h1>Become a Premium Member</h1>
        )}

        <ul>
          <li>Unlimited access to all content</li>

          <li>Exclusive resources and downloads</li>
          <li>Priority support and early access to new features</li>
        </ul>
        {message && (
          <Alert
            variant={message.includes("successful") ? "success" : "danger"}
          >
            {message}
          </Alert>
        )}

        {role === "USER" && (
          <div className="btnpremium">
            <p>Upgrade now to unlock all features and resources.</p>
            <p>Already a Premium Member? Enjoy your benefits!</p>
            <p>Secure payments with Paypal</p>
            <p
              style={{
                backgroundColor: "#00ff6f63",
                width: "30%",
                margin: "auto",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              Only $9.99
            </p>
            <Button
              style={{ marginTop: "10px", width: "150px" }}
              onClick={handleUpgradeClick}
            >
              Upgrade Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetPremium;
