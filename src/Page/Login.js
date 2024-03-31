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

// import React, { useState } from "react";
// import logo from "../img/logoE.png";

// function Login() {
//   const [activeTab, setActiveTab] = useState("login");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Form Data:", formData);
//   };

//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     console.log("Register Form Data:", formData);
//   };

//   return (
//     <div className="container ">
//       <div
//         className={`form-container ${
//           activeTab === "login" ? "login-container" : "register-container"
//         }`}
//       >
//         <form
//           onSubmit={
//             activeTab === "login" ? handleLoginSubmit : handleRegisterSubmit
//           }
//         >
//           <img style={{ width: "80px", height: "80px" }} src={logo} alt="" />
//           <h2 style={{ color: "Highlight" }}>Welcome to Edusmart</h2>
//           <h1>{activeTab === "login" ? "Sign In" : "Sign Up"}</h1>
//           {activeTab === "register" && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {activeTab === "register" && (
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <button type="submit">
//             {activeTab === "login" ? "Sign In" : "Sign Up"}
//           </button>
//         </form>
//         {activeTab === "login" ? (
//           <p>
//             Don't have an account?{" "}
//             <span
//               className="tab-link"
//               onClick={() => handleTabChange("register")}
//             >
//               Sign Up
//             </span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span className="tab-link" onClick={() => handleTabChange("login")}>
//               Sign In
//             </span>
//           </p>
//         )}
//         {activeTab === "login" && (
//           <p>
//             <span
//               className="tab-link"
//               onClick={() => handleTabChange("forgot")}
//             >
//               Forgot Password?
//             </span>
//           </p>
//         )}
//       </div>
//       <img
//         style={{ width: "400px", height: "600px" }}
//         src="https://i.pinimg.com/originals/1b/c8/53/1bc853096d57c63b2055fc0bbf30dd30.jpg"
//         alt=""
//       />
//     </div>
//   );
// }

// export default Login;
