import { Entity } from '../entity';
import { ENTITY_ENUM } from '../entity-enum';

export class Pipe extends Entity {
  constructor(id, options) {
    super(id);
    this.originPoint = {
      x: options.x,
      y: options.y,
    };
    this.endPoint = {};
    this.entityType = ENTITY_ENUM.PIPE;
  }

  draw(ctx) {
    if(!this.canDraw) return;
    ctx.beginPath();
    ctx.moveTo(this.originPoint.x, this.originPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);

    ctx.stroke();
  }

  setEndPoint(x, y) {
    this.endPoint.x = x;
    this.endPoint.y = y;
  }

  get canDraw() {
    return (this.endPoint.x !== undefined) && (this.endPoint.y !== undefined);
  }
}

function getAngle(p1, p2) {
  let dy, dx, theta;
  dy = p2.y - p1.y;
  dx = p2.x - p1.x;
  theta = Math.atan2(dy, dx);
  return theta;
}

function rotate(originAngle, degrees) {
  let radians;
  // originAngle - original angle in radians
  // degress - degrees to rotate
  radians = (Math.PI / 180) * degrees;
}
