import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { resolveUserRole } from "../../utils/role";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.account);

  console.log("🔍 PrivateRoute Debug:");
  console.log("- User from Redux:", user);
  console.log("- Allowed Roles:", allowedRoles);

  if (!user) {
    console.log("❌ No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = resolveUserRole(user);
    console.log("- User Role:", userRole);
    console.log("- Role Check Result:", allowedRoles.includes(userRole));

    if (!allowedRoles.includes(userRole)) {
      console.log("❌ Access denied for role:", userRole);
      return <Navigate to="/login" replace />;
    }
  }

  console.log("✅ Access granted");
  return <Outlet />;
};

export default PrivateRoute;
