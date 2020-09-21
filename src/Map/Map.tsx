import React, { useEffect, useRef, useState } from "react";
import IFood from "Models/Food";
import ICell from "Models/Cell";

type IMap = {
  width?: number;
  height?: number;
  rows?: number;
  cols?: number;
  foods: IFood[];
  cells: ICell[];
};
const Map: React.FC<IMap> = ({
  width = 1500,
  height = 1500,
  rows = 40,
  cols = 50,
  foods,
  cells,
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
  const drawGrids = () => {
    if (!canvas_context) return;
    // clear the canvas
    canvas_context.fillStyle = "#000";
    canvas_context.beginPath();
    canvas_context.fillRect(0, 0, width + 100, height + 100);

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
    drawGrids();
    drawFoods();
    drawCells();
  };

  useEffect(loadMap, [canvasRef.current]);
  useEffect(renderMap, [
    canvasRef.current,
    JSON.stringify(foods),
    JSON.stringify(cells),
  ]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        height: "100vh",
        width: "100%",
        background: "black",
      }}
    />
  );
};

export default Map;
