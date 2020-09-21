export default interface ICell {
  position: {
    x: number;
    y: number;
  };
  abillities: {
    move: number; // [0-100]
    decompose: number; // [0-100]
    stick: number; // [0-100];
  };
  fuel: number;
}
