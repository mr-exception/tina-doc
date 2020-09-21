import React from "react";
import "./Grid.css";

interface IRow {
  children?: JSX.Element | JSX.Element[] | string | null;
}

const Row: React.FC<IRow> = ({ children = "" }) => {
  return <div className="row">{children}</div>;
};

export default Row;
