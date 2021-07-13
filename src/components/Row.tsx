import React from "react";
import { RowModel } from "../models";
import { SharedLayoutProps, sharedLayoutPropTypes, splitRow } from "./layout";
import PropTypes from "prop-types";
import Dispatch from "./Dispatch";

const Row: React.FC<RowProps> = ({ row, ...props }) => {
  const itemProps = splitRow(props, row.children.length);
  return (
    <div
      className="absolute"
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    >
      {row.children.map((child, index) => (
        <Dispatch key={index.toString()} model={child} {...itemProps[index]} />
      ))}
    </div>
  );
};

Row.displayName = "Row";

Row.propTypes = {
  row: PropTypes.any.isRequired,
  ...sharedLayoutPropTypes,
};

export default Row;

export type RowProps = { row: RowModel } & SharedLayoutProps;
