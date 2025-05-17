import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "../pages/MainPage/MainPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import CamperPage from "../pages/CamperPage/CamperPage.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/camper" element={<CamperPage />} />
      </Routes>
    </>
  );
}

export default App;
