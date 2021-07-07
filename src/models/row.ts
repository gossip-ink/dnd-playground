import { Model } from "./model";

export type RowModel = {
  type: "row";
  children: Model[];
};

export function createRow(): RowModel {
  return { type: "row", children: [] };
}
