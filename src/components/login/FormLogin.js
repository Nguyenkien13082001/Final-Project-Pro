import React, { useEffect, useState } from "react";
import logo from "../../img/logoE.png";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { format, set } from "date-fns";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";

function FormLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setEmail("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post("/reset_password", {
        email: email,
      });
      if (response) {
        toast.success(response.message);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/api/login  ", formData);
      console.log(response);
      const role_allow = ["USER", "VIP"];
      if (response.access_token !== "" && role_allow.includes(response.role)) {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("role", response.role);
        setIsLoggedIn(true);
        navigate("/");
        console.log("Login successful!");
      } else {
        // Xử lý logic khi đăng nhập không thành công
        toast.error("Email or Password incorect!");
      }
    } catch (error) {
      // Xử lý lỗi tại đây
      toast.error(error.response.data.message);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      toast.error("mat khau k trung");
    } else if (new Date(formData.dob) > new Date()) {
      toast.error("Date of birth cannot be in the future");
    } else {
      try {
        const response = await apiClient.post("/api/register  ", formData);

        if (response) {
          toast.success("Create account success!");
          setActiveTab("login");
        } else {
          // Xử lý logic khi đăng nhập không thành công
          toast.error("Register isnt success!");
        }
      } catch (error) {
        console.log(error);
        // Xử lý lỗi tại đây
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="container ">
      <div
        className={`form-container ${
          activeTab === "login" ? "login-container" : "register-container"
        }`}
      >
        <form
          onSubmit={
            activeTab === "login" ? handleLoginSubmit : handleRegisterSubmit
          }
        >
          <img style={{ width: "80px", height: "80px" }} src={logo} alt="" />
          <h2 style={{ color: "Highlight" }}>Welcome to Edusmart</h2>
          <h1>{activeTab === "login" ? "Login" : "Sign Up"}</h1>
          {activeTab === "register" && (
            <input
              style={{ marginTop: "10px" }}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          {activeTab === "register" && (
            <input
              style={{ marginTop: "10px" }}
              name="dob"
              id="dob"
              type="date"
              placeholder="DoB"
              value={
                formData.dob ? format(new Date(formData.dob), "yyyy-MM-dd") : ""
              }
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />
          )}
          <input
            style={{ marginTop: "10px" }}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="form-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <BiHide style={{ fontSize: "22px" }} />
              ) : (
                <BiShow style={{ fontSize: "22px" }} />
              )}
            </span>
          </div>
          {activeTab === "register" && (
            <input
              style={{ marginTop: "10px" }}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}

          <button className="btnloginnn" type="submit">
            {activeTab === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        {activeTab === "login" ? (
          <p>
            Don't have an account?{" "}
            <span
              className="tab-link"
              onClick={() => handleTabChange("register")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="tab-link" onClick={() => handleTabChange("login")}>
              Login
            </span>
          </p>
        )}
        {activeTab === "login" && (
          <>
            <span className="tab-link" onClick={handleShow}>
              Forgot Password?
            </span>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <Form.Text className="text-muted">
                      We'll send you a link to reset your password.
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Send Email
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>

      <img
        className="image-login"
        style={{ width: "400px", height: "600px" }}
        src="https://i.pinimg.com/originals/1b/c8/53/1bc853096d57c63b2055fc0bbf30dd30.jpg"
        alt=""
      />
    </div>
  );
}

export default FormLogin;
