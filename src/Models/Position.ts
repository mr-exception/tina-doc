export interface IPosition {
  x: number;
  y: number;
}
export const calcDistance = (p1: IPosition, p2: IPosition): number => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
};
