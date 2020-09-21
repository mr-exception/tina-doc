import React from "react";
import "./Inputs.css";

interface IText {
  value: string;
  onChange: (value: string) => void;
  placeHolder: string;
  title: string;
}

const Text: React.FC<IText> = ({ value, onChange, placeHolder, title }) => {
  return (
    <div>
      <label className="label">{title}</label>
      <input
        className="input"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default Text;
