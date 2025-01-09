import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/registration";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import LandingPage from "./components/Landingpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />}/>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      
    </Routes>
  );
};

export default App;
