import { IPosition } from "./Position";

export default interface ICell {
  position: IPosition;
  abillities: {
    move: number; // [0-100]
    decompose: number; // [0-100]
    stick: number; // [0-100];
  };
  fuel: number;
}
