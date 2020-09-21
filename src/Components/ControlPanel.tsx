import React, { useEffect, useState } from "react";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import NumberInput from "Elements/Inputs/Number";
import Button from "Elements/Actions/Button";

interface IControlPanel {
  configChanged: Function;
  nextStep: Function;
  configs: {
    food_rate: number;
    cell_rate: number;
  };
}
const ControlPanel: React.FC<IControlPanel> = (props) => {
  const [food_rate, set_food_rate] = useState(props.configs.food_rate);
  const [cell_rate, set_cell_rate] = useState(props.configs.cell_rate);

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
              onChange={(value: number) => {
                set_food_rate(value);
              }}
              title="food produce rate (food/cycle)"
              placeHolder="1"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NumberInput
              value={cell_rate}
              onChange={(value: number) => {
                set_cell_rate(value);
              }}
              title="cell produce rate (cell/cycle)"
              placeHolder="1"
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

export default ControlPanel;
