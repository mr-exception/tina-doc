import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";

type ColProps = {
  children: JSX.Element | JSX.Element[] | string | null;
  flex: number | string;
};

const Col = (props: ColProps) => {
  return (
    <div className="col" style={{ flex: props.flex }}>
      {props.children}
    </div>
  );
};

Col.defaultProps = {
  children: "",
  flex: 1,
};

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]),
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Col;
