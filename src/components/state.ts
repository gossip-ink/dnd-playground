import { WindowModel } from "../models";

export type EditorState = {
  window: WindowModel;
  selection: SelectedBox[];
};

export type SelectedBox = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
