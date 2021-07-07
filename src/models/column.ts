import { Model } from "./model";

export type ColumnModel = {
  type: "column";
  children: Model[];
};

export function createColumn(): ColumnModel {
  return { type: "column", children: [] };
}
