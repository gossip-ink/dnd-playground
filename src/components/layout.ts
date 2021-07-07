import PropTypes from "prop-types";

export type SharedLayoutProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const sharedLayoutPropTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export function splitRow(
  enclosingProps: SharedLayoutProps,
  count: number,
  relative = true
): SharedLayoutProps[] {
  const itemWidth = enclosingProps.width / count;
  const x = relative ? 0 : enclosingProps.x;
  const y = relative ? 0 : enclosingProps.y;
  let props: SharedLayoutProps[] = [];
  for (let i = 0; i < count; i++) {
    props.push({
      x: x + i * itemWidth,
      y: y,
      width: itemWidth,
      height: enclosingProps.height,
    });
  }
  return props;
}

export function splitColumn(
  enclosingProps: SharedLayoutProps,
  count: number,
  relative = true
): SharedLayoutProps[] {
  const itemHeight = enclosingProps.height / count;
  const x = relative ? 0 : enclosingProps.x;
  const y = relative ? 0 : enclosingProps.y;
  let props: SharedLayoutProps[] = [];
  for (let i = 0; i < count; i++) {
    props.push({
      x: x,
      y: y + i * itemHeight,
      width: enclosingProps.width,
      height: itemHeight,
    });
  }
  return props;
}
