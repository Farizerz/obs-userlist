import React from "react";
import LOGO from "@/assets/images/logo.webp";
import Container from "@/components/atoms/Container";

const Header: React.FC = () => {
  return (
    <div className="bg-gradient h-[72px]">
      <Container className="w-full flex items-center justify-center px-18">
        <img src={LOGO} />
      </Container>
    </div>
  );
};

export default Header;
