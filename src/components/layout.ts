import PropTypes from "prop-types";

export type SharedLayoutProps = {
  absoluteX: number;
  absoluteY: number;
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
  count: number
): SharedLayoutProps[] {
  const itemWidth = enclosingProps.width / count;
  let props: SharedLayoutProps[] = [];
  for (let i = 0; i < count; i++) {
    props.push({
      absoluteX: enclosingProps.absoluteX + i * itemWidth,
      absoluteY: enclosingProps.absoluteY,
      x: i * itemWidth,
      y: 0,
      width: itemWidth,
      height: enclosingProps.height,
    });
  }
  return props;
}

export function splitColumn(
  enclosingProps: SharedLayoutProps,
  count: number
): SharedLayoutProps[] {
  const itemHeight = enclosingProps.height / count;
  let props: SharedLayoutProps[] = [];
  for (let i = 0; i < count; i++) {
    props.push({
      absoluteX: enclosingProps.absoluteX,
      absoluteY: enclosingProps.absoluteY + i * itemHeight,
      x: 0,
      y: i * itemHeight,
      width: enclosingProps.width,
      height: itemHeight,
    });
  }
  return props;
}
