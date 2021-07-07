import React from "react";
import { WindowModel } from "../models";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import Dispatch from "./Dispatch";
import { useSelection } from "./context";

const Window: React.FC<WindowProps> = ({ window, width, height }) => {
  const selection = useSelection();
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
          absoluteX={0}
          absoluteY={0}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      )}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        pointerEvents="none"
      >
        {selection.map(({ id, x, y, width, height }) => (
          <rect
            key={id}
            x={x + 1}
            y={y + 1}
            width={width - 2}
            height={height - 2}
            stroke="blue"
            strokeWidth="2"
            fill="transparent"
          />
        ))}
      </svg>
    </div>
  );
};

Window.displayName = "Window";

Window.propTypes = {
  window: PropTypes.any.isRequired,
  ...omit(sharedLayoutPropTypes, "x", "y", "absoluteX", "absoluteY"),
};

export default Window;

export type WindowProps = {
  window: WindowModel;
} & Omit<SharedLayoutProps, "x" | "y" | "absoluteX" | "absoluteY">;
