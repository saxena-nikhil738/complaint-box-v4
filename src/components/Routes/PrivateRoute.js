import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    // console.log(auth.token);
    console.log(auth?.token);
  }, [auth]);

  console.log(JSON.parse(localStorage.getItem("auth"))?.token);

  return JSON.parse(localStorage.getItem("auth"))?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/userlogin" replace state={{ prevUrl: location.pathname }} />
  );
}
