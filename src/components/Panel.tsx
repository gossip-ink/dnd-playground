import PropTypes from "prop-types";
import React from "react";
import { PanelModel } from "../models";
import { useSelectionControl } from "./context";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";

const Panel: React.FC<PanelProps> = ({
  panel,
  absoluteX,
  absoluteY,
  x,
  y,
  width,
  height,
}) => {
  const [selection, setSelection] = useSelectionControl();
  const selected = selection.findIndex((box) => box.id === panel.id) >= 0;
  return (
    <div
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
        background: panel.background,
      }}
      onClick={(e) => {
        if (selected) {
          setSelection(
            e.shiftKey ? selection.filter((box) => box.id !== panel.id) : []
          );
        } else {
          const box = {
            id: panel.id,
            x: absoluteX,
            y: absoluteY,
            width,
            height,
          };
          setSelection(e.shiftKey ? selection.concat(box) : [box]);
        }
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {panel.title.length === 0 ? "Untitled" : panel.title}
      </div>
    </div>
  );
};

Panel.displayName = "Panel";

Panel.propTypes = {
  panel: PropTypes.any.isRequired,
  ...sharedLayoutPropTypes,
};

export default Panel;

export type PanelProps = { panel: PanelModel } & SharedLayoutProps;
