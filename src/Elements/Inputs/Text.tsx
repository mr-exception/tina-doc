import React from "react";
import "./Inputs.css";

interface IText {
  value: string;
  onTextChange: Function;
  placeHolder: string;
}

const Text: React.FC<IText> = ({ value, onTextChange, placeHolder }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => {
        onTextChange(e.target.value);
      }}
      placeholder={placeHolder}
    />
  );
};

export default Text;
