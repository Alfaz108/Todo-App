import React from "react";
import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="h-8" />{" "}
          <span className="font-bold text-xl text-gray-600">T O D O</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
