import React, { useEffect, useState } from "react";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import NumberInput from "Elements/Inputs/Number";
import SelectInput from "Elements/Inputs/Select";
import CheckBoxInput from "Elements/Inputs/CheckBox";
import Button from "Elements/Actions/Button";
import { IWorldConfig } from "Models/WorldFunctions";

interface IControlPanel {
  configChanged: (configs: IWorldConfig) => void;
  nextStep: Function;
  start: Function;
  stop: Function;
  reset: Function;
  cycle: number;
  configs: IWorldConfig;
}
const ControlPanel: React.FC<IControlPanel> = ({
  cycle,

  nextStep,
  start,
  stop,
  reset,

  configChanged,
  configs,
}) => {
  const [food_rate, set_food_rate] = useState(configs.food_rate);
  const [food_period, set_food_period] = useState(configs.food_period);

  const [cell_rate, set_cell_rate] = useState(configs.cell_rate);
  const [cell_period, set_cell_period] = useState(configs.cell_period);

  const [speed, set_speed] = useState(configs.speed);

  const [show_grids, set_show_grids] = useState(configs.show_grids);

  const updateConfigs = () => {
    configChanged({
      food_rate,
      food_period,

      cell_rate,
      cell_period,

      speed,

      size: configs.size,
      show_grids,
    });
  };
  useEffect(updateConfigs, [food_rate, cell_rate, speed, show_grids]);
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
              title="food produce rate"
              placeHolder="1"
            />
          </Col>
          <Col>
            <NumberInput
              value={food_period}
              onChange={(value: number) => {
                set_food_period(value);
              }}
              title="per cycle"
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
              title="cell produce rate"
              placeHolder="1"
            />
          </Col>
          <Col>
            <NumberInput
              value={cell_period}
              onChange={(value: number) => {
                set_cell_period(value);
              }}
              title="per cycle"
              placeHolder="1"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckBoxInput
              value={show_grids}
              onChange={(value: boolean) => {
                set_show_grids(value);
              }}
              title="show grids"
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
            <h4 className="text-center">cycle: {cycle}</h4>
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
                { value: 62, label: "x16" },
              ]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ControlPanel;
