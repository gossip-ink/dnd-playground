import { Model } from "./model";

export type WindowModel = {
  type: "window";
  root: Model | null;
};

export function createWindow(): WindowModel {
  return { type: "window", root: null };
}
