import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";

type RowProps = {
  children: JSX.Element | JSX.Element[] | string | null;
};

const Row = (props: RowProps) => {
  return <div className="row">{props.children}</div>;
};

Row.defaultProps = {
  children: "",
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]),
};

export default Row;
