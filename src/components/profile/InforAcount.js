import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import EditProfile from "./EditProfile";
import "./InforAcount.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function InforAcount(props) {
  // Thông tin tài khoản người dùng (có thể đặt từ props hoặc state)
  // const { Username, Email, DoB, Status } = props.user;
  const [Listinfo, setListinfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("role") !== "USER" &&
      localStorage.getItem("role") !== "VIP"
    ) {
      toast.error("You must be login to access this page!");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = async () => {
    try {
      const response = await apiClient.get("/api/get_user");
      setListinfo(response.user_info);
    } catch (error) {}
  };

  const handleUpdateUser = () => {
    getInfo();
  };
  return (
    <div style={{ marginTop: "120px" }}>
      <div className="user-profile">
        <img
          style={{ height: "100px", width: "100px" }}
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt=""
        />
        <h1 style={{ color: "#4772eb9c" }}>Personal Information</h1>
        <div className="profile-info">
          <label>Name</label>
          <span>{Listinfo.Name}</span>
        </div>
        <div className="profile-info">
          <label>Email</label>
          <span>{Listinfo.Email}</span>
        </div>
        <div className="profile-info">
          <label>Dob</label>
          <span>{Listinfo.DoB}</span>
        </div>
        <div className="profile-info">
          <label>Status</label>
          <span>{Listinfo.Status}</span>
        </div>
        <div>
          <EditProfile user={Listinfo} onUpdateUser={handleUpdateUser} />
        </div>
      </div>
    </div>
  );
}

export default InforAcount;
