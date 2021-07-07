import React from "react";
import { PanelModel } from "../models";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";
import PropTypes from "prop-types";

const Panel: React.FC<PanelProps> = ({ panel, x, y, width, height }) => {
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
