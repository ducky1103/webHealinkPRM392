import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { resolveUserRole } from "../../utils/role";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.account);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = resolveUserRole(user);
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
  }
  return <Outlet />;
};

export default PrivateRoute;
