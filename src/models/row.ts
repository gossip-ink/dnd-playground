import nanoid from "./id";
import { Model } from "./model";

export type RowModel = {
  id: string;
  type: "row";
  children: Model[];
};

export function createRow(children: Model[] = []): RowModel {
  return { id: nanoid(), type: "row", children };
}
