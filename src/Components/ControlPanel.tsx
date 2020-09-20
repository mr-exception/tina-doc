import React, { useEffect, useState } from "react";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import NumberInput from "Elements/Inputs/Number";
import Button from "Elements/Actions/Button";
import PropTypes from "prop-types";

type ControlPanelProps = {
  configChanged: Function;
  nextStep: Function;
  configs: {
    food_rate: number;
  };
};
const ControlPanel = (props: ControlPanelProps) => {
  const [food_rate, set_food_rate] = useState(props.configs.food_rate);

  const updateConfigs = () => {
    props.configChanged({
      food_rate,
    });
  };
  useEffect(updateConfigs, [food_rate]);
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
            <NumberInput
              value={food_rate}
              onNumberChange={(value: number) => {
                set_food_rate(value);
              }}
              placeHolder="food popularity"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={(e) => props.nextStep()}>next step</Button>
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

ControlPanel.defaultProps = {
  configChanged: () => {},
  nextStep: () => {},
  configs: {
    food_rate: 8,
  },
};

ControlPanel.propTypes = {
  configChanged: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  configs: PropTypes.shape({
    food_rate: PropTypes.number,
  }).isRequired,
};

export default ControlPanel;
