import React from "react";
import Header from "./Header";
import Menu from "./Menu";

const Sidebar: React.FC = () => {
  return (
    <div className="xs:w-full sm:w-auto h-screen sm:border-r-1 sm:border-border fixed z-[3] bg-white">
      <Header />
      <Menu />
    </div>
  );
};

export default Sidebar;
