
export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function getVectorPoint(angle, length) {
  let x, y;
  x = length * Math.cos(angle);
  y = length * Math.sin(angle);
  return { x, y };
}

export function getAngle(p1, p2) {
  let dy, dx, theta;
  dy = p2.y - p1.y;
  dx = p2.x - p1.x;
  theta = Math.atan2(dy, dx);
  return theta;
}

export function rotate(originAngle, degrees) {
  let radians;
  // originAngle - original angle in radians
  // degress - degrees to rotate
  radians = (Math.PI / 180) * degrees;
}