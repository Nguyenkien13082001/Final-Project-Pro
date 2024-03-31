import React from "react";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Navbars from "../components/home/Navbars";

export default function LayoutHome({ children }) {
  return (
    <div>
      <Header />

      {/* <Navbars
        li={[
          ["Dashboard", "img/dashboard.svg"],
          ["Restautant’s", "img/restaurant.svg"],
          ["Manage User’s", "img/manage user.svg"],
          ["Manage Order’s", "img/manage  order.svg"],
          ["Manage Coupon’s", "img/manage coupon.svg"],
        ]}
      />
      <div className="ps-5">{children}</div> */}
      {/* <div className="ps-5">
        <Footer />
      </div> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
}
