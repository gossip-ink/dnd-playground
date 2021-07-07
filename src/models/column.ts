import nanoid from "./id";
import { Model } from "./model";

export type ColumnModel = {
  id: string;
  type: "column";
  children: Model[];
};

export function createColumn(children: Model[]): ColumnModel {
  return { id: nanoid(), type: "column", children };
}
