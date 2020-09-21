import React, { useEffect, useRef, useState } from "react";
import Map from "./Map/Map";
import Row from "Elements/Grid/Row";
import Col from "Elements/Grid/Col";
import ControlPanel from "Components/ControlPanel";
import IFood from "Models/Food";
import ICell from "Models/Cell";
import { IWorldConfig, singleCycle } from "Models/WorldFunctions";

export default () => {
  // dynamic and core data states
  const [foods, set_foods] = useState<IFood[]>([]);
  const [cells, set_cells] = useState<ICell[]>([]);

  // state and static data states
  const [run_state, set_run_state] = useState("not_running");
  const [cycle, set_cycle] = useState(0);
  const cycle_ref = useRef(cycle);
  cycle_ref.current = cycle;
  const [configs, set_configs] = useState<IWorldConfig>({
    food_rate: 10,
    food_period: 10,
    cell_rate: 2,
    cell_period: 10,
    speed: 1000,
    size: {
      cols: 60,
      rows: 75,
    },
  });

  // runtime control functions
  const runNextStep = () => {
    singleCycle(cycle_ref.current, set_cycle, configs, set_foods, set_cells);
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
          rows={configs.size.rows}
          cols={configs.size.cols}
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
