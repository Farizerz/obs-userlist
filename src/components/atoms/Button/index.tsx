import React from "react";
import MUIButton from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

interface IButton extends ButtonProps {
  title: string;
}

const Button: React.FC<IButton> = ({ title, ...props }) => {
  return <MUIButton {...props}>{title}</MUIButton>;
};

export default Button;
