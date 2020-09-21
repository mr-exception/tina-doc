import React, { useState } from "react";
import Map from "./Map/Map";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import ControlPanel from "Components/ControlPanel";
import IFood from "Models/Food";

const default_rows: number = 60;
const default_cols: number = 75;

export default () => {
  const [configs, set_configs] = useState({
    food_rate: 10,
    cell_rate: 2,
  });

  // food generation and data
  const [foods, set_foods] = useState<IFood[]>([]);
  const generateFoods = () => {
    const results: IFood[] = [];
    for (let i = 0; i < configs.food_rate; i++) {
      const x = Math.floor(Math.random() * default_cols);
      const y = Math.floor(Math.random() * default_rows);
      results.push({
        position: { x, y },
        value: Math.ceil(Math.random() * 100),
        price: Math.ceil(Math.random() * 50),
      });
    }
    set_foods(foods.concat(results));
  };

  const runNextStep = () => {
    generateFoods();
  };
  return (
    <Row>
      <Col flex="7">
        <Map rows={default_rows} cols={default_cols} foods={foods} />
      </Col>
      <Col flex="2">
        <ControlPanel
          configChanged={set_configs}
          nextStep={runNextStep}
          configs={configs}
        />
      </Col>
    </Row>
  );
};
