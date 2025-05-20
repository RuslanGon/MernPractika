import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "../pages/MainPage/MainPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import CamperPage from "../pages/CamperPage/CamperPage.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import CamperDetails from "../components/Camper/CamperDetails.jsx";
import ReviewsPage from "../components/Reviews/ReviewsPage.jsx";
import AddCamperPage from "../pages/AddCamper/AddCamperPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/camper" element={<CamperPage />} />
        <Route path="/camper/:id" element={<CamperDetails />} />
        <Route path="/camper/:id/reviews" element={<ReviewsPage />} />
        <Route path="/add" element={<AddCamperPage />} />

      </Routes>
    </>
  );
}

export default App;
