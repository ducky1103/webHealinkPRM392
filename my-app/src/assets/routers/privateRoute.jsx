import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { resolveUserRole } from "../../utils/role";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.account);

  // Add debug logs
  console.log("🔍 PrivateRoute Debug:");
  console.log("Loading:", loading);
  console.log("User:", user);
  console.log("User role from DB:", user?.role);
  console.log("Resolved role:", user ? resolveUserRole(user) : "No user");
  console.log("Allowed roles:", allowedRoles);

  // Show loading while checking authentication
  if (loading) {
    console.log("⏳ Loading...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log("❌ No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = resolveUserRole(user);
    console.log("🔐 Role check:", userRole, "in", allowedRoles);
    console.log("🔐 Role check result:", allowedRoles.includes(userRole));

    if (!allowedRoles.includes(userRole)) {
      console.log("❌ Role not allowed, redirecting to login");
      return <Navigate to="/login" replace />;
    }
  }

  console.log("✅ Access granted");
  return <Outlet />;
};

export default PrivateRoute;
