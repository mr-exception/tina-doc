import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

type MapProps = {
  resolution: {
    width: number;
    height: number;
  };
  size: {
    rows: number;
    cols: number;
  };
};

const Map = (props: MapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = props.resolution;
  const { rows, cols } = props.size;

  const drawGrids = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const cellHeight = height / rows;
    const cellWidth = width / cols;
    for (let i = 0; i < rows; i++) {
      const yOffset = i * cellHeight;
      ctx.moveTo(0, yOffset);
      ctx.lineTo(width, yOffset);
    }

    for (let i = 0; i < cols; i++) {
      const xOffset = i * cellWidth;
      ctx.moveTo(xOffset, 0);
      ctx.lineTo(xOffset, height);
    }
    ctx.stroke();
  };
  const loadMap = () => {
    if (canvasRef.current !== null) {
      const canvas: HTMLCanvasElement = canvasRef.current;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d") || new CanvasRenderingContext2D();
      drawGrids(context);
    }
  };
  useEffect(loadMap, []);
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

Map.defaultProps = {
  resolution: {
    width: 1500,
    height: 1500,
  },
  size: {
    rows: 40,
    cols: 40,
  },
};

Map.propTypes = {
  resolution: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  size: PropTypes.shape({
    rows: PropTypes.number,
    cols: PropTypes.number,
  }),
};

export default Map;
