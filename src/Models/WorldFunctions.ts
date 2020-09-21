import ICell from "./Cell";
import IFood from "./Food";

export interface IWorldConfig {
  food_rate: number;
  food_period: number;
  cell_rate: number;
  cell_period: number;
  speed: number;
  size: {
    cols: number;
    rows: number;
  };
}

export const generateFoods = (
  configs: IWorldConfig,
  set_foods: React.Dispatch<React.SetStateAction<IFood[]>>
) => {
  const results: IFood[] = [];
  for (let i = 0; i < configs.food_rate; i++) {
    const x = Math.floor(Math.random() * configs.size.cols);
    const y = Math.floor(Math.random() * configs.size.rows);
    results.push({
      position: { x, y },
      value: Math.ceil(Math.random() * 100),
      price: Math.ceil(Math.random() * 50),
    });
  }
  set_foods((foods) => foods.concat(results));
};

export const generateCells = (
  configs: IWorldConfig,
  set_cells: React.Dispatch<React.SetStateAction<ICell[]>>
) => {
  const results: ICell[] = [];
  for (let i = 0; i < configs.cell_rate; i++) {
    const x = Math.floor(Math.random() * configs.size.cols);
    const y = Math.floor(Math.random() * configs.size.rows);
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
