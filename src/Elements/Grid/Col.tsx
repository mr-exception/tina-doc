import React from "react";
import "./Grid.css";

interface IColProps {
  children?: JSX.Element | JSX.Element[] | string | null;
  flex?: number | string;
}

const Col: React.FC<IColProps> = ({ flex = 1, children = "" }) => {
  return (
    <div className="col" style={{ flex: flex }}>
      {children}
    </div>
  );
};
export default Col;
