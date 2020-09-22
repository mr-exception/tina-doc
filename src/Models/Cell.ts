import { IPosition } from "./Position";

export default interface ICell {
  position: IPosition;
  abillities: {
    move: number;
    decompose: number;
    stick: number;
    scan: number;
  };
  fuel: number;
}
