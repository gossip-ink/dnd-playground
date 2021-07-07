import { createContext, useContext, useCallback } from "react";
import { EditorState, SelectedBox } from "./state";

export type EditorContextValue = {
  state: EditorState;
  mutate: (state: EditorState) => void;
};

export const EditorContext = createContext<EditorContextValue>(
  {} as EditorContextValue
);

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
      [mutate]
    ),
  ];
}
