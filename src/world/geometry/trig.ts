import { Point } from "./shapes";

export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function getVectorPoint(angle: number, length: number): Point {
  let x, y;
  x = length * Math.cos(angle);
  y = length * Math.sin(angle);
  return { x, y };
}

export function getAngle(p1: Point , p2: Point) {
  let dy, dx, theta;
  dy = p2.y - p1.y;
  dx = p2.x - p1.x;
  theta = Math.atan2(dy, dx);
  return theta;
}

export function rotate(originAngle: number, degrees: number) {
  let radians;
  // originAngle - original angle in radians
  // degress - degrees to rotate
  radians = (Math.PI / 180) * degrees;
}

export function getDistance(p1: Point, p2:Point) {
  let a: number, b: number, c: number;
  a = p1.x - p2.x;
  b = p1.y - p2.y;
  c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  return c;
}
