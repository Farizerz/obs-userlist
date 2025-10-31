import React from "react";
import { GroupIcon } from "@/assets";
import MenuButton from "./MenuButton";

const Menu: React.FC = () => {
  return (
    <div className="px-2 py-3 flex flex-col gap-2">
      <MenuButton icon={GroupIcon} title="User" />
    </div>
  );
};

export default Menu;
