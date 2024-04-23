import React from "react";
import LayoutProfile from "../layouts/LayoutProfile";
import Evaluater from "../components/Evaluate/Evaluater";

export default function EvaluatePage() {
  return (
    <LayoutProfile>
      <div>
        <Evaluater />
      </div>
    </LayoutProfile>
  );
}
