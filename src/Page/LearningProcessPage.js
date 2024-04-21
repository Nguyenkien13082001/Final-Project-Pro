import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import LearningProcess from "../components/LearningProcess/LearningProcess";
import LayoutProfile from "../layouts/LayoutProfile";

export default function LearningProcessPage() {
  return (
    <LayoutProfile>
      <div>
        <LearningProcess />
      </div>
    </LayoutProfile>
  );
}
