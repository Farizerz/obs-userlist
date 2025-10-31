import React from "react";
import Container from "@/components/atoms/Container";
import { BellIcon } from "@/assets";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-[72px] border-1 border-border bg-white bg-white fixed z-[1] sm:pl-[252px]">
      <Container className="flex items-center justify-between">
        <h1>User</h1>
        <div className="flex flex-row gap-2 items-center ">
          <img
            src={BellIcon}
            alt="Notification Button"
            className="w-[24px] h-[24px] mx-2 cursor-pointer"
          />
          <div className="w-[42px] h-[42px] bg-primary rounded-full"></div>
          <span className="flex flex-col">
            <h2 className="cursor-pointer">Fariz R R</h2>
            <p className="text-[12px] text-lightgray">Admin</p>
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
