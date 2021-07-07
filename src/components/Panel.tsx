import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { PanelModel } from "../models";
import { Direction } from "../types";
import { useEditorContext } from "./context";
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
  const ref = useRef<HTMLDivElement>(null);
  const {
    state: { window, selection },
    mutate,
  } = useEditorContext();
  const setSelection = (newSelection: typeof selection) =>
    mutate({ window: window, selection: newSelection });
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
      {collected.dragging && direction ? (
        <div
          style={{
            position: "absolute",
            top: direction === "bottom" ? "50%" : 0,
            right: direction === "left" ? "50%" : 0,
            bottom: direction === "top" ? "50%" : 0,
            left: direction === "right" ? "50%" : 0,
            background: "rgba(0, 0, 0, 0.25)",
          }}
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
  const p1: Point = [rect.left, rect.top];
  const p2: Point = [rect.right, rect.bottom];
  const a = determineLineDirection(p, p1, p2);
  const b = determineLineDirection(p, [p1[0], p2[1]], [p1[1], p2[0]]);
  return a ? (b ? "left" : "bottom") : b ? "top" : "right";
}

function determineLineDirection(
  [x, y]: Point,
  [x1, y1]: Point,
  [x2, y2]: Point
): boolean {
  return (y - y2) / (y1 - y2) < (x - x2) / (x1 - x2);
}
