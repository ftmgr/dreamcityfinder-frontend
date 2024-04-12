import NavBar from "./components/NavBar";
import ContentPage from "./pages/ContentPage";
import AdminPage from "./pages/AdminPage";
import CityDetailPage from "./pages/CityDetailPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/city-detail" element={<CityDetailPage />} />
        {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
