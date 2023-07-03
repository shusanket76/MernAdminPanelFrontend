import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../features/hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username, status } = useAuth();
  const HomeButton = () => navigate("/");
  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = <button onClick={HomeButton}>GO TO HOME PAGE</button>;
  }
  return (
    <div className="w-full bg-gradient-to-bl from-black to-black p-5">
      <p className="text-center text-white">Current User: {username}</p>
      <p className="text-center text-white">DEVELOPED BY SHUSANKET</p>
      {/* <p>STATUS: {status}</p> */}
    </div>
  );
};

export default DashFooter;
