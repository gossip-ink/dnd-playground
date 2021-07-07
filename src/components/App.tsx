import React, { useState } from "react";
import { createColumn, createPanel, createRow, createWindow } from "../models";
import Button from "./Button";
import { EditorContext } from "./context";
import { EditorState } from "./state";
import Window from "./Window";

const initialValue: EditorState = {
  window: createWindow(
    createRow([
      createPanel("hello"),
      createColumn([createPanel("foo"), createPanel("bar")]),
      createPanel("pop"),
      createColumn([
        createPanel("uno"),
        createPanel("dos"),
        createPanel("tres"),
      ]),
    ])
  ),
  selection: [],
};

const App: React.FC<AppProps> = () => {
  const [editorState, setEditorState] = useState(initialValue);
  return (
    <EditorContext.Provider
      value={{ state: editorState, mutate: setEditorState }}
    >
      <div>
        <header>
          <h1>Gossip DnD Playground</h1>
        </header>
        <section>
          <h2>Toolbar</h2>
          <Button name="panel" />
        </section>
        <main>
          <h2>Preview</h2>
          <Window window={editorState.window} width={800} height={600} />
        </main>
      </div>
    </EditorContext.Provider>
  );
};

App.displayName = "App";

App.propTypes = {};

export default App;

export type AppProps = {};
