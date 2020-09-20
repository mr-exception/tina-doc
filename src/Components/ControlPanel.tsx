import React from "react";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import TextInput from "Elements/Inputs/Text";
import Button from "Elements/Actions/Button";

export default () => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h2 className="text-center">tina world</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextInput placeHolder="food popularity" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>start</Button>
          </Col>
          <Col>
            <Button>pause</Button>
          </Col>
          <Col>
            <Button>reset</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
