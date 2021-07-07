import React from "react";
import { WindowModel } from "../models";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import Dispatch from "./Dispatch";

const Window: React.FC<WindowProps> = ({ window, width, height }) => {
  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {window.root === null ? null : (
        <Dispatch
          model={window.root}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

Window.displayName = "Window";

Window.propTypes = {
  window: PropTypes.any.isRequired,
  ...omit(sharedLayoutPropTypes, "x", "y"),
};

export default Window;

export type WindowProps = {
  window: WindowModel;
} & Omit<SharedLayoutProps, "x" | "y">;
