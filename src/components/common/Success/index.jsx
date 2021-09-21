import React from "react";

const Success = () => {
  return (
    <div className="check-container">
      <div className="check-background">
        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 25L27.3077 44L58.5 7"
            stroke="white"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div className="check-shadow"></div>
    </div>
  );
};

export default Success;
