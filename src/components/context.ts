import { createContext, useContext, useCallback } from "react";
import { WindowModel } from "../models";
import { EditorState, SelectedBox } from "./state";

export type EditorContextValue = {
  state: EditorState;
  mutate: (state: EditorState) => void;
};

export const EditorContext = createContext<EditorContextValue>(
  {} as EditorContextValue
);

export function useEditorContext(): EditorContextValue {
  return useContext(EditorContext);
}

export function useSelection(): SelectedBox[] {
  return useContext(EditorContext).state.selection;
}

export function useSelectionControl(): [
  SelectedBox[],
  (selection: SelectedBox[]) => void
] {
  const { state, mutate } = useContext(EditorContext);
  return [
    state.selection,
    useCallback(
      (selection: SelectedBox[]): void =>
        mutate({ window: state.window, selection }),
      [state]
    ),
  ];
}

export function useWindowModel(): WindowModel {
  return useContext(EditorContext).state.window;
}

export function useWindowModelState(): [
  WindowModel,
  (window: WindowModel) => void
] {
  const { state, mutate } = useContext(EditorContext);
  return [
    state.window,
    useCallback(
      (window: WindowModel): void => (
        console.log("setWindow", state.selection),
        mutate({ selection: state.selection, window })
      ),
      [state]
    ),
  ];
}
