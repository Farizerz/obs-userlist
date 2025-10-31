import React from "react";

interface IMenuButton {
  icon?: string;
  title: string;
  onClick?: () => void;
}

const MenuButton: React.FC<IMenuButton> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer hover:bg-lightgray2 text-lightgray hover:text-primary px-2 py-3 rounded-[12px]"
    >
      <span className="flex flex-row items-center gap-3">
        <img src={icon} alt={title} width={24} height={24} />
        <h2>{title}</h2>
      </span>
    </button>
  );
};

export default MenuButton;
