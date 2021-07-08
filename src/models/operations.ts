import cloneDeep from "lodash/cloneDeep";
import { Direction } from "../types";
import { ColumnModel, createColumn } from "./column";
import { Model } from "./model";
import { PanelModel } from "./panel";
import { createRow, RowModel } from "./row";
import { WindowModel } from "./window";

export function addPanelAtDirection(
  window: WindowModel,
  panel: PanelModel,
  target: string,
  direction: Direction
): WindowModel {
  switch (direction) {
    case "bottom":
      return addPanelAtBottomOf(window, panel, target);
    case "left":
      return addPanelAtLeftOf(window, panel, target);
    case "right":
      return addPanelAtRightOf(window, panel, target);
    case "top":
      return addPanelAtTopOf(window, panel, target);
    default:
      throw new Error(`unknown direction ${direction}`);
  }
}

export function addPanelAtRightOf(
  window: WindowModel,
  panel: PanelModel,
  target: string
): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    enclosing.root = createRow([model, panel]);
  } else if (enclosing.type === "row") {
    enclosing.children.splice((index as number) + 1, 0, panel);
  } else {
    enclosing.children.splice(index as number, 1, createRow([model, panel]));
  }
  // A little bit cumbersome but works for now.
  return cloneDeep(window);
}

export function addPanelAtLeftOf(
  window: WindowModel,
  panel: PanelModel,
  target: string
): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    enclosing.root = createRow([model, panel]);
  } else if (enclosing.type === "row") {
    enclosing.children.splice(index as number, 0, panel);
  } else {
    enclosing.children.splice(index as number, 1, createRow([panel, model]));
  }
  // A little bit cumbersome but works for now.
  return cloneDeep(window);
}

export function addPanelAtTopOf(
  window: WindowModel,
  panel: PanelModel,
  target: string
): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    enclosing.root = createRow([model, panel]);
  } else if (enclosing.type === "column") {
    enclosing.children.splice(index as number, 0, panel);
  } else {
    enclosing.children.splice(index as number, 1, createColumn([panel, model]));
  }
  // A little bit cumbersome but works for now.
  return cloneDeep(window);
}

export function addPanelAtBottomOf(
  window: WindowModel,
  panel: PanelModel,
  target: string
): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    enclosing.root = createRow([model, panel]);
  } else if (enclosing.type === "column") {
    enclosing.children.splice((index as number) + 1, 0, panel);
  } else {
    enclosing.children.splice(index as number, 1, createColumn([model, panel]));
  }
  // A little bit cumbersome but works for now.
  return cloneDeep(window);
}

export function replaceWith(
  window: WindowModel,
  target: string,
  replacement: Model
): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    return { ...enclosing, root: replacement };
  } else {
    enclosing.children.splice(index as number, 1, replacement);
    // A little bit cumbersome but works for now.
    return cloneDeep(window);
  }
}

export function removePanel(window: WindowModel, target: string): WindowModel {
  const result = locateElement(window, target);
  if (result === null) {
    return window;
  }
  const [enclosing, model, index] = result;
  if (enclosing.type === "window") {
    return { ...enclosing, root: null };
  } else {
    enclosing.children.splice(index as number, 1);
    if (enclosing.children.length === 0) {
      return removePanel(window, enclosing.id);
    } else if (enclosing.children.length === 1) {
      return replaceWith(window, enclosing.id, enclosing.children[0]);
    } else {
      // A little bit cumbersome but works for now.
      return cloneDeep(window);
    }
  }
}

export type ElementLocation =
  | [WindowModel, Model, null]
  | [RowModel | ColumnModel, Model, number];

export function locateElement(
  window: WindowModel,
  id: string
): ElementLocation | null {
  if (window.root === null) {
    return null;
  }
  if (window.root.id === id) {
    return [window, window.root, null];
  }
  return locate(window.root, id);

  function locate(model: Model, id: string): ElementLocation | null {
    if (model.type === "panel") {
      return null;
    }
    for (let i = 0, length = model.children.length; i < length; i++) {
      const child = model.children[i];
      if (child.id === id) {
        return [model, child, i];
      }
      const result = locate(child, id);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
}
