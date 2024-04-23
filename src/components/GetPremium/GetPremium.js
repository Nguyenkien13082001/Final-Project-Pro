// GetPremium.js

import React from "react";
import "./GetPremium.css";
// import qrCodeImg from "./qr-code.png"; // Adjust the path as needed

const GetPremium = () => {
  return (
    <div className="get-premium-container">
      <div className="premium-card">
        <h1>Become a Premium Member</h1>
        <ul>
          <li>Unlimited access to all content</li>
          <li>Ad-free viewing experience</li>
          <li>Exclusive resources and downloads</li>
          <li>Priority support and early access to new features</li>
        </ul>
        <img
          src="data:image/png;base64,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"
          alt="QR Code"
          className="qr-code-img"
        />
        <a href="#" className="btnPremium">
          Upgrade Now
        </a>
      </div>
    </div>
  );
};

export default GetPremium;
