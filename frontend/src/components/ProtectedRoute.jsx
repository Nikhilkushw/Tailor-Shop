import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  // Agar login nahi hai
  if (!user) return <Navigate to="/login" replace />;

  // Agar role match nahi karta
  if (role && user.role !== role) return <Navigate to="/" replace />;

  // Agar sab sahi hai
  return <Outlet />;
};
