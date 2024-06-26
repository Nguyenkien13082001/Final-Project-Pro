import React from "react";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Navbars from "../components/home/Navbars";
import Support from "../components/home/Support";

export default function LayoutHome({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Support />
      <Footer />
    </div>
  );
}
