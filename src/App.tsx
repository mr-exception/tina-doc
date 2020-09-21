import React, { useEffect, useState } from "react";
import Map from "./Map/Map";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import ControlPanel from "Components/ControlPanel";
import IFood from "Models/Food";
import ICell from "Models/Cell";

const default_rows: number = 60;
const default_cols: number = 75;

export default () => {
  const [configs, set_configs] = useState({
    food_rate: 10,
    cell_rate: 2,
    speed: 1000,
  });
  const [run_state, set_run_state] = useState("not_running");
  const [cycle, set_cycle] = useState(0);

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
    set_foods((foods) => foods.concat(results));
  };
  // cell generation and data
  const [cells, set_cells] = useState<ICell[]>([]);
  const generateCells = () => {
    const results: ICell[] = [];
    for (let i = 0; i < configs.cell_rate; i++) {
      const x = Math.floor(Math.random() * default_cols);
      const y = Math.floor(Math.random() * default_rows);
      results.push({
        position: { x, y },
        abillities: {
          move: Math.ceil(Math.random() * 100),
          stick: Math.ceil(Math.random() * 100),
          decompose: Math.ceil(Math.random() * 100),
        },
        fuel: Math.ceil(Math.random() * 100),
      });
    }
    set_cells((cells) => cells.concat(results));
  };

  const runNextStep = () => {
    generateFoods();
    generateCells();
    set_cycle((cycle) => cycle + 1);
  };

  const [interval, set_interval] = useState<NodeJS.Timeout>();
  const start = () => {
    const intvl = setInterval(runNextStep, configs.speed);
    set_interval(intvl);
    set_run_state("running");
  };
  const stop = () => {
    if (interval) {
      clearInterval(interval);
      set_run_state("not_running");
    }
  };
  const reset = () => {
    set_foods([]);
    set_cells([]);
    stop();
  };
  const speedChanged = () => {
    if (run_state === "running") {
      stop();
      start();
    }
  };
  useEffect(speedChanged, [configs.speed]);
  return (
    <Row>
      <Col flex="7">
        <Map
          rows={default_rows}
          cols={default_cols}
          foods={foods}
          cells={cells}
        />
      </Col>
      <Col flex="2">
        <ControlPanel
          cycle={cycle}
          configChanged={set_configs}
          nextStep={runNextStep}
          start={start}
          stop={stop}
          reset={reset}
          configs={configs}
        />
      </Col>
    </Row>
  );
};
