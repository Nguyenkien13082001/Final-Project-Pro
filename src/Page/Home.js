import React from "react";
import SliderHome from "../components/home/SliderHome";
import Doc from "../components/home/Doc";
import LayoutHome from "../layouts/LayoutHome";
import Search from "../components/home/Search";

export default function Home() {
  return (
    <LayoutHome>
      <SliderHome />

      <Doc />
    </LayoutHome>
  );
}
