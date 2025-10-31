import React from "react";
import { NotFoundIcon } from "@/assets";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">
      <img src={NotFoundIcon} alt="error" className="w-[256px] h-[256px]" />
      <h1>There was an error displaying the data.</h1>
    </div>
  );
};

export default NotFound;
