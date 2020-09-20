import React, { useState } from "react";
import Map from "./Map/Map";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import TextInput from "Elements/Inputs/Text";

export default () => {
  const [value, setValue] = useState("");
  return (
    <Row>
      <Col flex="1">
        <Map />
      </Col>
      <Col flex="1">
        <TextInput
          value={value}
          onTextChange={setValue}
          placeHolder="some text"
        />
      </Col>
    </Row>
  );
};
