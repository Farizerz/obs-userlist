import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/molecules/Navbar";
import Sidebar from "@/components/molecules/Sidebar";

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="w-full h-full flex flex-row relative">
      <div className="xs:hidden sm:block">
        <Sidebar />
      </div>
      <div className="w-full h-auto">
        <Navbar />
        <div className="h-screen sm:pl-[252px] pt-[72px]">
          <Outlet />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
