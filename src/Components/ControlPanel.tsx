import React, { useEffect, useState } from "react";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import NumberInput from "Elements/Inputs/Number";
import SelectInput from "Elements/Inputs/Select";
import Button from "Elements/Actions/Button";

interface IControlPanel {
  configChanged: Function;
  nextStep: Function;
  start: Function;
  stop: Function;
  reset: Function;
  configs: {
    food_rate: number;
    cell_rate: number;
    speed: number;
  };
}
const ControlPanel: React.FC<IControlPanel> = ({
  configChanged,

  nextStep,
  start,
  stop,
  reset,

  configs,
}) => {
  const [food_rate, set_food_rate] = useState(configs.food_rate);
  const [cell_rate, set_cell_rate] = useState(configs.cell_rate);
  const [speed, set_speed] = useState(configs.speed);

  const updateConfigs = () => {
    configChanged({
      food_rate,
      cell_rate,
      speed,
    });
  };
  useEffect(updateConfigs, [food_rate, cell_rate, speed]);
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
            <Button onClick={(e) => nextStep()}>next step</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={(e) => start()}>start</Button>
          </Col>
          <Col>
            <Button onClick={(e) => stop()}>pause</Button>
          </Col>
          <Col>
            <Button onClick={(e) => reset()}>reset</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectInput
              title="speed"
              value={speed}
              onChange={set_speed}
              options={[
                { value: 1000, label: "x1" },
                { value: 500, label: "x2" },
                { value: 250, label: "x4" },
                { value: 125, label: "x8" },
              ]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ControlPanel;
