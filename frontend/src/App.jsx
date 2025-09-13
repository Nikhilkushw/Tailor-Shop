import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./components/AdminServices";
import AdminOffers from "./components/AdminOffers";
import AdminWorkImages from "./components/AdminWorkImages";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<PasswordReset />} />

            {/* Admin Protected Pages */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/services" element={<AdminServices />} />
              <Route path="/offers" element={<AdminOffers />} />
              <Route path="/work-images" element={<AdminWorkImages />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
