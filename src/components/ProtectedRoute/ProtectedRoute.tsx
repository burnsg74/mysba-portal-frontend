import * as React from "react";
import { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) return navigate("/");
  }, [authState, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
