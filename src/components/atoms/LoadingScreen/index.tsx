import React from "react";
import "./styles.css";

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <span className="loader" />
    </div>
  );
};

export default LoadingScreen;
