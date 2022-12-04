import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  if (!isAuthenticated) return <Navigate to="/login" replace={true} />;

  return <Outlet />;
};
