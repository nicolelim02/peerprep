import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";
import ServerError from "../ServerError";

type ProtectedRoutesProps = { 
  adminOnly?: boolean;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ adminOnly = false }) => {
  const auth = useAuth();
  if (!auth) {
    throw new Error("useAuth() must be used within AuthProvider");
  }
  const { user } = auth;

  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (adminOnly && !user.isAdmin) {
    return (
      <ServerError
        title="Oops, access denied..."
        subtitle="Unfortunately, you do not have the permission to access this page 😥"
      />
    );
  } 
  
  return <Outlet />;
};

export default ProtectedRoutes;