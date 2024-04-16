import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ContentPage from "./pages/ContentPage";
import AdminPage from "./pages/AdminPage";
import CityDetailPage from "./pages/CityDetailPage";
import AdminCityDetailPage from "./pages/AdminCityDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserProfilePage";

import { CityProvider } from "./contexts/CityContext";
import "./styles/global.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <CityProvider>
      <NavBar />

      <div className="content">
        {" "}
        {/* This div wraps the route views and expands */}
        <Routes>
          <Route path="/" element={<ContentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/city/:cityId" element={<AdminCityDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/city/:cityId" element={<CityDetailPage />} />
          {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </CityProvider>
  );
}

export default App;
