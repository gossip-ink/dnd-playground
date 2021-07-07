import React from "react";
import { createPanel, WindowModel } from "../models";
import Button from "./Button";
import Window from "./Window";

const sample: WindowModel = {
  type: "window",
  root: {
    type: "row",
    children: [
      createPanel("hello"),
      {
        type: "column",
        children: [createPanel("foo"), createPanel("bar")],
      },
      createPanel("pop"),
      {
        type: "column",
        children: [createPanel("uno"), createPanel("dos"), createPanel("tres")],
      },
    ],
  },
};

const App: React.FC<AppProps> = () => {
  return (
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
        <Window window={sample} width={800} height={600} />
      </main>
    </div>
  );
};

App.displayName = "App";

App.propTypes = {};

export default App;

export type AppProps = {};
