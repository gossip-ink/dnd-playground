import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { PanelModel } from "../models";
import { changeTitle, removePanel } from "../models/operations";
import { Direction } from "../types";
import { useEditorContext } from "./context";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";
import classNames from "classnames";
import TextField from "./TextField";

const Panel: React.FC<PanelProps> = ({
  panel,
  absoluteX,
  absoluteY,
  x,
  y,
  width,
  height,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    state: { window, selection },
    mutate,
  } = useEditorContext();
  const setSelection = (newSelection: typeof selection) =>
    mutate({ window, selection: newSelection });
  const setWindow = (newWindow: typeof window) =>
    mutate({ selection, window: newWindow });
  const selected = selection.findIndex((box) => box.id === panel.id) >= 0;
  const [direction, setDirection] = useState<Direction | null>();
  const [collected, dropRef] = useDrop(
    () => ({
      accept: "panel",
      collect: (monitor) => ({
        dragging: monitor.isOver(),
        item: monitor.getItem(),
      }),
      hover: (_, monitor) => {
        if (ref.current === null) {
          return;
        }
        const p = monitor.getClientOffset();
        if (p === null) {
          setDirection(null);
        } else {
          setDirection(determineDirection(ref.current, [p.x, p.y]));
        }
      },
      drop: (_, monitor) => {
        setDirection(null);
        if (ref.current === null) {
          return;
        }
        const p = monitor.getClientOffset();
        if (p === null) {
          return;
        } else {
          return {
            id: panel.id,
            direction: determineDirection(ref.current, [p.x, p.y]),
          };
        }
      },
    }),
    [window, selection]
  );
  useEffect(() => {
    if (selected) {
      setSelection(
        selection
          .filter((box) => box.id !== panel.id)
          .concat({
            id: panel.id,
            x: absoluteX,
            y: absoluteY,
            width,
            height,
          })
      );
    }
  }, [selected, absoluteX, absoluteY, width, height]);
  return (
    <div
      ref={(dropRef(ref), ref)}
      className="absolute"
      style={{
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <TextField
          value={panel.title.length === 0 ? "Untitled" : panel.title}
          onChange={(newTitle) =>
            setWindow(changeTitle(window, panel.id, newTitle))
          }
        />
        <button
          className="px-2 py-0.5 bg-gray-200 border border-gray-400 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setWindow(removePanel(window, panel.id));
            if (selected) {
              setSelection(selection.filter((box) => box.id !== panel.id));
            }
          }}
        >
          Delete
        </button>
      </div>
      {collected.dragging && direction ? (
        <div
          className={classNames(
            "absolute bg-gray-900 opacity-25",
            direction === "bottom" ? "top-1/2" : "top-0",
            direction === "left" ? "right-1/2" : "right-0",
            direction === "top" ? "bottom-1/2" : "bottom-0",
            direction === "right" ? "left-1/2" : "left-0"
          )}
        />
      ) : null}
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

type Point = [x: number, y: number];

function determineDirection(el: HTMLDivElement, p: Point): Direction {
  const rect = el.getBoundingClientRect();
  const leadingDiagonal = determineLineDirection(
    p,
    [rect.left, rect.top],
    [rect.right, rect.bottom]
  );
  const counterDiagonal = determineLineDirection(
    p,
    [rect.left, rect.bottom],
    [rect.right, rect.top]
  );
  return leadingDiagonal
    ? counterDiagonal
      ? "left"
      : "bottom"
    : counterDiagonal
    ? "top"
    : "right";
}

function determineLineDirection(
  [x, y]: Point,
  [x1, y1]: Point,
  [x2, y2]: Point
): boolean {
  // From https://stackoverflow.com/questions/1560492
  return Math.sign((x2 - x1) * (y - y1) - (y2 - y1) * (x - x1)) > 0;
}
