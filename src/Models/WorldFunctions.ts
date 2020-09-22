import ICell from "./Cell";
import IFood from "./Food";
import { calcDistance, IPosition } from "./Position";

const MAX_MOVE_ABILLITY_AMOUNT = 100;
const MAX_SCAN_ABILLITY = 200;

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
  show_grids: boolean;
}

export const generateFoods = (configs: IWorldConfig): IFood[] => {
  const results: IFood[] = [];
  for (let i = 0; i < configs.food_rate; i++) {
    const x = Math.floor(Math.random() * configs.size.cols);
    const y = Math.floor(Math.random() * configs.size.rows);
    results.push({
      position: { x, y },
      value: Math.ceil(Math.random() * 1500) + 500,
      price: Math.ceil(Math.random() * 100),
    });
  }
  return results;
};

export const generateCells = (configs: IWorldConfig): ICell[] => {
  const results: ICell[] = [];
  for (let i = 0; i < configs.cell_rate; i++) {
    const x = Math.floor(Math.random() * configs.size.cols);
    const y = Math.floor(Math.random() * configs.size.rows);
    results.push({
      position: { x, y },
      abillities: {
        move: Math.ceil(Math.random() * MAX_MOVE_ABILLITY_AMOUNT),
        stick: Math.ceil(Math.random() * MAX_MOVE_ABILLITY_AMOUNT),
        decompose: Math.ceil(Math.random() * MAX_MOVE_ABILLITY_AMOUNT),
        scan: Math.ceil(Math.random() * MAX_SCAN_ABILLITY),
      },
      fuel: Math.ceil(Math.random() * 2000),
    });
  }
  return results;
};

const findBestFood = (cell: ICell, foods: IFood[] = []): IFood | undefined => {
  const max_reachable_distance = cell.fuel / (100 - cell.abillities.move);
  return foods
    .map((food: IFood) => {
      const distance = calcDistance(cell.position, food.position);
      const can_reach = distance < max_reachable_distance;
      const needed_fuel = distance * (100 - cell.abillities.move);
      const target_score = food.value - (food.price + needed_fuel);
      return { ...food, distance, can_reach, target_score };
    })
    .filter((food) =>
      food.target_score > 0 &&
      food.can_reach &&
      food.distance < cell.abillities.scan
        ? food
        : null
    )
    .sort((f1, f2) => {
      if (f1.target_score > f2.target_score) return 1;
      else if (f1.target_score < f2.target_score) return -1;
      else return 0;
    })
    .pop();
};

const moveToPoint = (cell: ICell, position: IPosition): ICell => {
  if (cell.position.x < position.x) {
    cell.position.x++;
    cell.fuel -= 100 - cell.abillities.move;
    return cell;
  }
  if (cell.position.x > position.x) {
    cell.position.x--;
    cell.fuel -= 100 - cell.abillities.move;
    return cell;
  }
  if (cell.position.y < position.y) {
    cell.position.y++;
    cell.fuel -= 100 - cell.abillities.move;
    return cell;
  }
  if (cell.position.y > position.y) {
    cell.position.y--;
    cell.fuel -= 100 - cell.abillities.move;
    return cell;
  }
  return cell;
};

export const singleCycle = (
  cycle: number,
  set_cycle: React.Dispatch<React.SetStateAction<number>>,
  configs: IWorldConfig,
  foods: IFood[],
  cells: ICell[],
  set_foods: React.Dispatch<React.SetStateAction<IFood[]>>,
  set_cells: React.Dispatch<React.SetStateAction<ICell[]>>
) => {
  let current_cells: ICell[] = cells;
  let current_foods: IFood[] = foods;
  if (cycle % configs.food_period === 0)
    current_foods = current_foods.concat(generateFoods(configs));
  if (cycle % configs.cell_period === 0)
    current_cells = current_cells.concat(generateCells(configs));

  // cells move action
  current_cells = current_cells.map((cell: ICell) => {
    const best_food: IFood | undefined = findBestFood(cell, current_foods);
    if (best_food) {
      return moveToPoint(cell, best_food.position);
    } else {
      cell.fuel -= 20;
      return cell;
    }
  });
  // foods import action
  current_foods = current_foods.filter((food: IFood) => {
    const cell = cells.find(
      (cell: ICell) =>
        cell.position.x === food.position.x &&
        cell.position.y === food.position.y
    );
    if (cell) {
      cell.fuel += food.value - food.price;
      return null;
    } else {
      return food;
    }
  });
  // kill dead cells
  current_cells = current_cells.filter((cell: ICell) => {
    if (cell.fuel > 0) return cell;
    else {
      const value =
        cell.abillities.move +
        cell.abillities.stick +
        cell.abillities.decompose +
        cell.abillities.scan;
      const dead_cell: IFood = {
        position: cell.position,
        value: value,
        price: 20,
      };
      current_foods.push(dead_cell);
      return null;
    }
  });

  set_foods(() => current_foods);
  set_cells(() => current_cells);
  set_cycle((cycle) => cycle + 1);
};
