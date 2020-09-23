import React from "react";
import "./Grid.css";

interface IRow {
  children?: JSX.Element | JSX.Element[] | string | null;
  style?: object;
}

const Row: React.FC<IRow> = ({ children = "", style }) => {
  return (
    <div className="row" style={style || {}}>
      {children}
    </div>
  );
};

export default Row;
