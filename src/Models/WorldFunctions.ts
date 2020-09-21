import ICell from "./Cell";
import IFood from "./Food";
import { calcDistance } from "./Position";

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
      value: Math.ceil(Math.random() * 2000),
      price: Math.ceil(Math.random() * 100),
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
      fuel: Math.ceil(Math.random() * 2000),
    });
  }
  set_cells((cells) => cells.concat(results));
};

// const findBestFood = (cell: ICell, foods: IFood[] = []): IFood | undefined => {
//   return foods
//     .map((food: IFood) => {
//       const distance = calcDistance(cell.position, food.position);
//       return food;
//     })
//     .pop();
// };

export const singleCycle = (
  cycle: number,
  set_cycle: React.Dispatch<React.SetStateAction<number>>,
  configs: IWorldConfig,
  set_foods: React.Dispatch<React.SetStateAction<IFood[]>>,
  set_cells: React.Dispatch<React.SetStateAction<ICell[]>>
) => {
  if (cycle % configs.food_period === 0) generateFoods(configs, set_foods);
  if (cycle % configs.cell_period === 0) generateCells(configs, set_cells);
  set_cycle((cycle) => cycle + 1);
};
