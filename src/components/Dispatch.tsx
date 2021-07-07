import React from "react";
import { Model } from "../models";
import { SharedLayoutProps, sharedLayoutPropTypes } from "./layout";
import PropTypes from "prop-types";
import Column from "./Column";
import Row from "./Row";
import Panel from "./Panel";

const Dispatch: React.FC<DispatchProps> = ({ model, ...rest }) => {
  switch (model.type) {
    case "column":
      return <Column column={model} {...rest} />;
    case "row":
      return <Row row={model} {...rest} />;
    case "panel":
      return <Panel panel={model} {...rest} />;
    default:
      return null;
  }
};

Dispatch.displayName = "Dispatch";

Dispatch.propTypes = {
  model: PropTypes.any.isRequired,
  ...sharedLayoutPropTypes,
};

export default Dispatch;

export type DispatchProps = { model: Model } & SharedLayoutProps;
