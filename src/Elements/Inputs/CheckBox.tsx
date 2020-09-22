import React from "react";
import "./Inputs.css";

interface ICheckBox {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
}

const CheckBox: React.FC<ICheckBox> = ({ value, onChange, title }) => {
  return (
    <div className="check-box">
      <input
        type="checkbox"
        className="input"
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <label className="label">{title}</label>
    </div>
  );
};

export default CheckBox;
