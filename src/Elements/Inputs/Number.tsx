import React from "react";
import "./Inputs.css";

type INumber = {
  value: number;
  onChange: (value: number) => void;
  placeHolder: string;
  title: string;
};

const Number: React.FC<INumber> = ({ value, onChange, placeHolder, title }) => {
  return (
    <div>
      <label className="label">{title}</label>
      <input
        className="input"
        type="number"
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
        }}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default Number;
