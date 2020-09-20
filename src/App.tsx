import React from "react";
import Map from "./Map/Map";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";

export default () => {
  return (
    <Row>
      <Col flex="7">
        <Map />
      </Col>
      <Col flex="2"></Col>
    </Row>
  );
};
