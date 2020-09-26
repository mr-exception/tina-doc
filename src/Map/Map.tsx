import React, { useEffect, useRef, useState } from "react";
import IFood from "Models/Food";
import ICell from "Models/Cell";
import "./Map.css";
import InfoPopup from "./InfoPopup";

type IMap = {
  width?: number;
  height?: number;
  rows?: number;
  cols?: number;
  foods: IFood[];
  cells: ICell[];
  showGrids?: boolean;
  id?: string;
};
const Map: React.FC<IMap> = ({
  width = 1500,
  height = 1500,
  rows = 40,
  cols = 50,
  foods,
  cells,
  showGrids = true,
  id = "canvas",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas_context, set_canvas_context] = useState<
    CanvasRenderingContext2D
  >();

  const getCanvasContext = (): CanvasRenderingContext2D => {
    if (!canvasRef.current) return new CanvasRenderingContext2D();
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d") || new CanvasRenderingContext2D();
    return context;
  };
  const fillUnit = (x: number, y: number, color: string) => {
    if (!canvas_context) return;
    const unit_width = width / cols;
    const unit_height = height / rows;
    canvas_context.fillStyle = color;
    canvas_context.lineWidth = 0;
    canvas_context.beginPath();
    canvas_context.rect(
      x * unit_width,
      y * unit_height,
      unit_width,
      unit_height
    );
    canvas_context.fill();
  };
  const drawFoods = () => {
    foods.forEach((food: IFood) => {
      fillUnit(food.position.x, food.position.y, "red");
    });
  };
  const drawCells = () => {
    cells.forEach((cell: ICell) => {
      fillUnit(cell.position.x, cell.position.y, "yellow");
    });
  };
  const clearCanvas = () => {
    if (!canvas_context) return;
    canvas_context.fillStyle = "#000";
    canvas_context.beginPath();
    canvas_context.fillRect(0, 0, width + 100, height + 100);
  };
  const drawGrids = () => {
    if (!canvas_context) return;
    // start drawing the lines
    canvas_context.fillStyle = "#FFF";
    canvas_context.strokeStyle = "#555";
    canvas_context.lineWidth = 2;

    const cellHeight = height / rows;
    const cellWidth = width / cols;
    for (let i = 0; i < rows; i++) {
      const yOffset = i * cellHeight;
      canvas_context.moveTo(0, yOffset);
      canvas_context.lineTo(width, yOffset);
    }

    for (let i = 0; i < cols; i++) {
      const xOffset = i * cellWidth;
      canvas_context.moveTo(xOffset, 0);
      canvas_context.lineTo(xOffset, height);
    }
    canvas_context.stroke();
  };
  const loadMap = () => {
    set_canvas_context(getCanvasContext());
  };
  const renderMap = () => {
    clearCanvas();
    if (showGrids) drawGrids();
    drawFoods();
    drawCells();
  };

  const [show_info_popup, set_show_info_popup] = useState(false);
  const [info_popup_position, set_info_popup_position] = useState({
    x: 0,
    y: 0,
    col: 0,
    row: 0,
  });
  const showPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    set_show_info_popup(true);
  };
  const hidePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    set_show_info_popup(false);
  };
  const configPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y } = event.nativeEvent;
    const client_width = document.getElementById(id)?.clientWidth || 1;
    const position_x = Math.floor((x / client_width) * cols);
    const client_height = document.getElementById(id)?.clientHeight || 1;
    const position_y = Math.floor((y / client_height) * rows);

    set_info_popup_position({
      col: position_x,
      row: position_y,
      x: (position_x + 1) * (client_width / cols),
      y: (position_y + 1) * (client_height / rows),
    });
  };

  useEffect(loadMap, [canvasRef.current]);
  useEffect(renderMap, [
    canvasRef.current,
    JSON.stringify(foods),
    JSON.stringify(cells),
    showGrids,
  ]);

  const selected_cell = cells
    .filter((cell: ICell) => {
      if (
        info_popup_position.col === cell.position.x &&
        info_popup_position.row === cell.position.y
      )
        return cell;
      return null;
    })
    .pop();
  const selected_food = foods
    .filter((food: IFood) => {
      if (
        info_popup_position.col === food.position.x &&
        info_popup_position.row === food.position.y
      )
        return food;
      return null;
    })
    .pop();
  return (
    <div
      className="map"
      onMouseMove={configPopup}
      onMouseEnter={showPopup}
      onMouseLeave={hidePopup}
    >
      <canvas
        id={id}
        ref={canvasRef}
        style={{
          height: "100vh",
          width: "100%",
          background: "black",
        }}
      />
      <InfoPopup
        show={show_info_popup}
        position={info_popup_position}
        selected_cell={selected_cell}
        selected_food={selected_food}
      />
    </div>
  );
};

export default Map;
