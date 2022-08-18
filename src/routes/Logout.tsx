import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../api/AuthenticationService";
import "../styles/sass/Logout.css";

export const Logout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate("/");
  });

  return <div id="logout-container">Logged out. Redirecting...</div>;
};
