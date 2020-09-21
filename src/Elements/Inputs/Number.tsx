import React from "react";
import "./Inputs.css";

type INumber = {
  value: number;
  onNumberChange: (value: number) => void;
  placeHolder: string;
};

const Number: React.FC<INumber> = ({ value, onNumberChange, placeHolder }) => {
  return (
    <input
      className="input"
      type="number"
      value={value}
      onChange={(e) => {
        onNumberChange(parseInt(e.target.value));
      }}
      placeholder={placeHolder}
    />
  );
};

export default Number;
