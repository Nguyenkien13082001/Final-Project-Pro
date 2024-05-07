import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Page/Login";
import Home from "./Page/Home";
import CreatTopic from "./Page/CreatTopic";
import Profile from "./Page/Profile";
import Admin from "./Page/Admin/Admin";
import Acount from "./Page/Admin/Acount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./components/profile/EditProfile";
import TopicInterface from "./Page/TopicInterface";
import ExamInterfaceOne from "./components/ExamInterfaceOne/ExamInterfaceOne";
import PracticeResults from "./components/PracticeResults/PracticeResults";
import LearningProcessPage from "./Page/LearningProcessPage";
import EvaluatePage from "./Page/EvaluatePage";
import PracticeResultsPage from "./Page/PracticeResultsPage";
import GetPremiumPage from "./Page/GetPremiumPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/login/ResetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="creattopic" element={<CreatTopic />} />
      <Route path="profile" element={<Profile />} />
      <Route path="editprofile" element={<EditProfile />} />
      <Route
        path="/creattopic/TopicInterface/:exam_id"
        element={<ExamInterfaceOne />}
      />

      <Route path="admin" element={<Admin />} />
      <Route path="admin/account" element={<Acount />} />
      <Route
        path="/PracticeResults/:exam_id"
        element={<PracticeResultsPage />}
      />
      <Route path="learning-process" element={<LearningProcessPage />} />
      <Route path="/evaluate" element={<EvaluatePage />} />
      <Route path="/get-premium" element={<GetPremiumPage />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
