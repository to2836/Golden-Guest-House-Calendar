import React from "react";

const Close = ({ classNames, strokeColor = "#3B3C43", ...props }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames} {...props}>
      <path className="pointer-events-none" d="M11 1L1 11" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="pointer-events-none" d="M1 1L11 11" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export default Close;
