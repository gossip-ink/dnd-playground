import React from "react";
import { useDrag } from "react-dnd";
import { createPanel } from "../models";
import * as operations from "../models/operations";
import { Direction } from "../types";
import { useWindowModelState } from "./context";
import PropTypes from "prop-types";

type DropResult = { id: string; direction: Direction };

type DragItem = {};

type DragCollectResult = { dragging: boolean };

const Button: React.FC<ButtonProps> = ({ name }) => {
  const [window, setWindow] = useWindowModelState();
  const [a, ref, c] = useDrag<DragItem, DropResult, DragCollectResult>(
    () => ({
      type: name,
      collect: (monitor) => ({
        dragging: monitor.isDragging(),
      }),
      end: (drop, monitor): void => {
        const result = monitor.getDropResult();
        if (result === null) {
          return;
        }
        setWindow(
          operations.addPanelAtDirection(
            window,
            createPanel(""),
            result.id,
            result.direction
          )
        );
      },
    }),
    [window, setWindow]
  );
  return (
    <button
      ref={ref}
      className="px-2 py-0.5 bg-gray-200 border border-gray-400 rounded"
    >
      {name}
    </button>
  );
};

Button.displayName = "Button";

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;

export type ButtonProps = {
  /**
   * Block name.
   */
  name: string;
};
