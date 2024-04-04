import React from "react";
import SliderHome from "../components/home/SliderHome";
import Doc from "../components/home/Doc";
import LayoutHome from "../layouts/LayoutHome";
import Search from "../components/home/Search";
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
    <LayoutHome>
      <SliderHome />
      <Search />
      <div
        style={{ marginTop: "10px" }}
        className="row justify-content-center mx-auto "
      >
        {render()}
      </div>
    </LayoutHome>
  );
}
