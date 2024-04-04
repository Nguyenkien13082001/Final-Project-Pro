import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") != "ADMIN") {
      toast.error("You have'nt to admin!");
      navigate("/");
    }
  }, []);

  return <div>Admin</div>;
}
