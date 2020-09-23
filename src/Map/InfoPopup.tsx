import React from "react";
import IFood from "Models/Food";
import ICell from "Models/Cell";
import "./Map.css";

type IInfoPopup = {
  selected_cell: ICell | undefined;
  selected_food: IFood | undefined;
  show: boolean;
  position: { x: number; y: number };
};
const InfoPopup: React.FC<IInfoPopup> = ({
  selected_cell,
  selected_food,
  show,
  position,
}) => {
  if (!show) return null;
  if (selected_cell)
    return (
      <div
        className="popup"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <label>cell</label>
        <br />
        <label>fuel: {selected_cell.fuel}</label>
        <br />
      </div>
    );
  if (selected_food)
    return (
      <div
        className="popup"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <label>food</label>
        <br />
        <label>value: {selected_food.value}</label>
        <br />
        <label>price: {selected_food.price}</label>
        <br />
      </div>
    );
  return (
    <div
      className="popup"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      empty
    </div>
  );
};

export default InfoPopup;
