
import { Point, Rect } from './shapes';
import { EntityBoundingRect } from '../entities/entity';

export function isPointInBoundingRect(point: Point, boundingRect: EntityBoundingRect) {
  const { x, y } = point;
  const { top, right, left, bottom } = boundingRect;
  return (x < right)
  && (x > left)
  && (y > top)
  && (y < bottom);
}

export function boundingRectToRect(boundingRect: EntityBoundingRect): Rect {
  let x, y, width, height;
  const { top, right, bottom, left } = boundingRect;
  x = left;
  y = top;
  width = right - left;
  height = bottom - top;
  return {
    x,
    y,
    width,
    height,
  };
}
