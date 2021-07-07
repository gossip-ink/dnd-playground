import React from "react";
import { useDrag } from "react-dnd";
// import PropTypes from "prop-types";

const Button: React.FC<ButtonProps> = ({ name }) => {
  const [a, ref, c] = useDrag(() => ({
    type: name,
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  }));
  return <button ref={ref}>{name}</button>;
};

Button.displayName = "Button";

Button.propTypes = {};

export default Button;

export type ButtonProps = {
  /**
   * Block name.
   */
  name: string;
};
