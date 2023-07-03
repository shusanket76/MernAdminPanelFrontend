import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";


const DashedLayout = () => {
  return (
    <>
      <div className="mainLayout">
        <DashHeader />
        
          <Outlet />
        
        <DashFooter />
      </div>
    </>
  );
};

export default DashedLayout;
