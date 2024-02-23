import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DevRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
    </>
  );
};

export default DevRoute;
