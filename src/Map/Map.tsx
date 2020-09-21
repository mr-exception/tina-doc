import React, { useEffect, useRef, useState } from "react";
import IFood from "Models/Food";

type IMap = {
  width?: number;
  height?: number;
  rows?: number;
  cols?: number;
  foods: IFood[];
};
const Map: React.FC<IMap> = ({
  width = 1500,
  height = 1500,
  rows = 40,
  cols = 50,
  foods,
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
  const drawFoods = () => {
    if (!canvas_context) return;

    const unit_width = width / cols;
    const unit_height = height / rows;
    foods.forEach((food: IFood) => {
      canvas_context.fillStyle = "red";
      canvas_context.lineWidth = 0;
      canvas_context.beginPath();
      canvas_context.rect(
        food.position.x * unit_width,
        food.position.y * unit_height,
        unit_width,
        unit_height
      );
      canvas_context.fill();
    });
  };
  const drawGrids = () => {
    if (!canvas_context) return;
    canvas_context.fillStyle = "#FFF";
    canvas_context.strokeStyle = "#555";
    canvas_context.lineWidth = 2;
    canvas_context.beginPath();

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

  useEffect(loadMap, [canvasRef.current]);
  useEffect(drawGrids, [canvasRef.current]);
  useEffect(drawFoods, [foods.length]);
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
