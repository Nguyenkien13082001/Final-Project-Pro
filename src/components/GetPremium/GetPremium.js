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
          <h1>You are already a Premium Member</h1>
        ) : (
          <h1>Become a Premium Member</h1>
        )}

        <ul>
          <li>Unlimited access to all content</li>
          <li>Ad-free viewing experience</li>
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
        <p>Upgrade now to unlock all features and resources.</p>
        <p>Only $9.99/month</p>
        <p>Cancel anytime</p>
        <p>Secure payments with Paypal</p>

        <p>Already a Premium Member? Enjoy your benefits!</p>
        {role === "USER" && (
          <Button onClick={handleUpgradeClick}>Upgrade Now</Button>
        )}
      </div>
    </div>
  );
};

export default GetPremium;
