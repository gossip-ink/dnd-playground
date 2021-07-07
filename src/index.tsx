import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("app-root")
);

if (module.hot) {
  module.hot.accept();
}