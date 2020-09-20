import React from "react";
import PropTypes from "prop-types";
import "./Actions.css";

type ButtonProps = {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  children: "",
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("on click!");
  },
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
};

export default Button;
