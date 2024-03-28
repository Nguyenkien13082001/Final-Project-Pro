import React from "react";
import NavbarHome from "../components/home/NavbarHome";
import SliderHome from "../components/home/SliderHome";
import Footer from "../components/home/Footer";
import Doc from "../components/home/Doc";
const list = [
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halo" },
  { id: 1, name: "Halokdahda" },
  { id: 1, name: "Halo" },
];
export default function Home() {
  const render = () => {
    return list.map((item) => {
      return (
        <div className="col-3 d-flex justify-content-center mb-3">
          <Doc item={item} />
        </div>
      );
    });
  };
  return (
    <div>
      <NavbarHome />
      <SliderHome />

      <div
        style={{ marginTop: "10px", backgroundColor: "#b3979714" }}
        className="row justify-content-start "
      >
        {render()}
      </div>

      <Footer />
    </div>
  );
}
