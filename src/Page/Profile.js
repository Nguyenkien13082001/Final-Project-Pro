import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import NavbarProfile from "../components/profile/NavbarProfile";
import InforAcount from "../components/profile/InforAcount";
import { useEffect } from "react";
export default function Profile() {
  return (
    <LayoutHome>
      <div style={{ height: "80vh" }}>
        <NavbarProfile
          li={[
            ["Infor Accout", "img/manage user.svg"],
            ["Learning Process", "img/manage  order.svg"],
            ["Evaluate", "img/arrow-chart-8379.svg"],
            ["Get Premium", "img/thanhtoan.svg"],
          ]}
        ></NavbarProfile>
        <InforAcount />
      </div>
    </LayoutHome>
  );
}
