import React from "react";
import PropTypes from "prop-types";
import "./Inputs.css";

type TextProps = {
  value: string;
  onTextChange: Function;
  placeHolder: string;
};

const Text = (props: TextProps) => {
  return (
    <input
      className="input"
      value={props.value}
      onChange={(e) => {
        props.onTextChange(e.target.value);
      }}
      placeholder={props.placeHolder}
    />
  );
};

Text.defaultProps = {
  value: "",
  onTextChange: () => {},
  placeHolder: "",
};

Text.propTypes = {
  value: PropTypes.string,
  onTextChange: PropTypes.func,
  placeHolder: PropTypes.string,
};

export default Text;
