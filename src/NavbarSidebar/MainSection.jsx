import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainSection = () => {
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        {/* navbar */}
        <Navbar />

        {/* content here  */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainSection;
