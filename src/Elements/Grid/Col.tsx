import React from "react";
import "./Grid.css";

interface IColProps {
  children?: JSX.Element | JSX.Element[] | string | null;
  flex?: number | string;
  style?: object;
}

const Col: React.FC<IColProps> = ({ flex = 1, children = "", style }) => {
  return (
    <div className="col" style={{ flex: flex, ...(style || {}) }}>
      {children}
    </div>
  );
};
export default Col;
