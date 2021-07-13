import React from "react";
import { ColumnModel } from "../models";
import {
  SharedLayoutProps,
  sharedLayoutPropTypes,
  splitColumn,
} from "./layout";
import PropTypes from "prop-types";
import Dispatch from "./Dispatch";

const Column: React.FC<ColumnProps> = ({ column, ...props }) => {
  const itemProps = splitColumn(props, column.children.length);
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
      {column.children.map((child, index) => (
        <Dispatch key={index.toString()} model={child} {...itemProps[index]} />
      ))}
    </div>
  );
};

Column.displayName = "Column";

Column.propTypes = {
  column: PropTypes.any.isRequired,
  ...sharedLayoutPropTypes,
};

export default Column;

export type ColumnProps = { column: ColumnModel } & SharedLayoutProps;
