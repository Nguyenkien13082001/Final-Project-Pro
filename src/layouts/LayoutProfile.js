import React from "react";
import NavbarProfile from "../components/profile/NavbarProfile";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Support from "../components/home/Support";

export default function LayoutProfile({ children }) {
  return (
    <div>
      <Header />
      <NavbarProfile />
      <div>{children}</div>

      <Footer />
    </div>
  );
}
