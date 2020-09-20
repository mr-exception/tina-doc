import React from "react";
import PropTypes from "prop-types";
import "./Inputs.css";

type NumberProps = {
  value: number;
  onNumberChange: Function;
  placeHolder: string;
};

const Number = (props: NumberProps) => {
  return (
    <input
      className="input"
      type="number"
      value={props.value}
      onChange={(e) => {
        props.onNumberChange(parseInt(e.target.value));
      }}
      placeholder={props.placeHolder}
    />
  );
};

Number.defaultProps = {
  value: 0,
  onNumberChange: () => {},
  placeHolder: "",
};

Number.propTypes = {
  value: PropTypes.number,
  onNumberChange: PropTypes.func,
  placeHolder: PropTypes.string,
};

export default Number;
