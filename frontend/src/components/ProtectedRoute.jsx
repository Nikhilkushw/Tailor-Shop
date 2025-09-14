import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  // Jab tak auth check ho raha hai
  if (loading) return <p>Loading...</p>; // 👈 show loader instead of redirect

  // Agar login nahi hai
  if (!user) return <Navigate to="/login" replace />;

  // Agar role match nahi karta
  if (role && user.role !== role) return <Navigate to="/" replace />;

  // Agar sab sahi hai
  return <Outlet />;
};
