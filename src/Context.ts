import ICell from "Models/Cell";
import IFood from "Models/Food";
import React from "react";

export interface IContext {
  foods: IFood[];
  cells: ICell[];
  cycle: number;
}
export const Context = React.createContext<IContext>({
  foods: [],
  cells: [],
  cycle: 0,
});
