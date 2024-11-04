import React from "react";

const ActionBtn = ({ content, width, className = "", type }) => {
  return (
    <button
      className={`main-bg-color text-white rounded-2 p-2 mybtn fw-medium ${className}`}
      style={{ height: "50px", width }}
      type={type ? type : "button"}
    >
      {content}
    </button>
  );
};

export default ActionBtn;
