import React from "react";
import "./Inputs.css";

interface IOption {
  value: number | string;
  label: string;
}

interface ISelect {
  value: any;
  onChange: (value: any) => void;
  title: string;
  options: Array<IOption>;
}

const Select: React.FC<ISelect> = ({ value, onChange, title, options }) => {
  return (
    <div>
      <label className="label">{title}</label>
      <select
        className="input"
        defaultValue={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
