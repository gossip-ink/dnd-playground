import React from "react";
import { Model } from "../models";
import { useSelection, useWindowModel } from "./context";
import PropTypes from "prop-types";

const Tree: React.FC<TreeProps> = ({}) => {
  const window = useWindowModel();
  return (
    <div>
      <div>Window</div>
      {window.root === null ? (
        <>{window.type}</>
      ) : (
        <>
          <TreeNode model={window.root} />
        </>
      )}
    </div>
  );
};

Tree.displayName = "Tree";

Tree.propTypes = {};

export default Tree;

export type TreeProps = {};

const TreeNode: React.FC<TreeNodeProps> = ({ model }) => {
  const selection = useSelection();
  switch (model.type) {
    case "column":
      return (
        <>
          <div>Column</div>
          <ol>
            {model.children.map((child) => (
              <li key={child.id}>
                <TreeNode model={child} />
              </li>
            ))}
          </ol>
        </>
      );
    case "panel":
      return (
        <span
          style={{
            fontWeight:
              selection.findIndex((box) => box.id === model.id) >= 0
                ? "bold"
                : "normal",
          }}
        >
          Panel: {model.title}
        </span>
      );
    case "row":
      return (
        <>
          <div>Row</div>
          <ol>
            {model.children.map((child) => (
              <li key={child.id}>
                <TreeNode model={child} />
              </li>
            ))}
          </ol>
        </>
      );
    default:
      return <>Unknown</>;
  }
};

TreeNode.displayName = "TreeNode";

TreeNode.propTypes = {
  model: PropTypes.any.isRequired,
};

export type TreeNodeProps = { model: Model };
