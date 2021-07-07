import nanoid from "./id";
import { Model } from "./model";

export type WindowModel = {
  id: string;
  type: "window";
  root: Model | null;
};

export function createWindow(root: Model | null = null): WindowModel {
  return { id: nanoid(), type: "window", root };
}
