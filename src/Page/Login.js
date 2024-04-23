import React from "react";
import FormLogin from "../components/login/FormLogin";
import LayoutHome from "../layouts/LayoutHome";

export default function Login() {
  return (
    <LayoutHome>
      {" "}
      <div className="login-form">
        <FormLogin />
      </div>
    </LayoutHome>
  );
}
