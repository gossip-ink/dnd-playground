import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TextField: React.FC<TextFieldProps> = ({ value = "", onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [buffer, setBuffer] = useState(value);
  useEffect(() => setBuffer(value), [value]);
  return isEditing ? (
    <input
      className="px-2 py-0.5 max-w-full"
      type="text"
      value={buffer}
      onChange={(e) => setBuffer(e.target.value)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onChange?.(buffer);
          setIsEditing(false);
        } else if (e.key === "Escape") {
          setIsEditing(false);
        }
      }}
      onBlur={(e) => {
        if (confirm("Are you going to save?")) {
          onChange?.(buffer);
          setIsEditing(false);
        } else {
          e.preventDefault();
        }
      }}
    />
  ) : (
    <div
      onClick={onClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {value}
    </div>
  );

  function onClick(
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void {
    e.stopPropagation();
  }
};

TextField.displayName = "TextField";

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;

export type TextFieldProps = {
  value?: string;
  onChange?: (newValue: string) => void;
};
