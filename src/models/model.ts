import { ColumnModel } from "./column";
import { PanelModel } from "./panel";
import { RowModel } from "./row";
import { WindowModel } from "./window";

export type EnclosingModel = RowModel | ColumnModel | WindowModel;

export type Model = PanelModel | RowModel | ColumnModel;
