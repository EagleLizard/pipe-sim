import { Entity } from '../entity';
import { ENTITY_ENUM } from '../entity-enum';

import {
  getAngle,
  toRadians,
  getVectorPoint,
} from '../../geometry/trig';

export class Pipe extends Entity {
  constructor(id, options) {
    super(id, ENTITY_ENUM.PIPE);
    this.originPoint = {
      x: options.x,
      y: options.y,
    };
    this.endPoint = {};
  }

  draw(ctx) {
    let p1, p2, pipeAngle, arrowPoints;
    if(!this.canDraw) return;
    p1 = {
      x: this.originPoint.x,
      y: this.originPoint.y,
    };
    p2 = {
      x: this.endPoint.x,
      y: this.endPoint.y,
    };
    pipeAngle = getAngle(p1, p2);
    arrowPoints = getArrowPoints(pipeAngle, 15);
    // draw pipe
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(
      p2.x - arrowPoints.pA.x,
      p2.y - arrowPoints.pA.y,
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(
      p2.x - arrowPoints.pB.x,
      p2.y - arrowPoints.pB.y,
    );
    ctx.stroke();
  }

  get boundingRect() {
    let top, right, bottom, left;
    top = (this.originPoint.y < this.endPoint.y)
      ? this.originPoint.y
      : this.endPoint.y;
    right = (this.originPoint.x > this.endPoint.x)
      ? this.originPoint.x
      : this.endPoint.x;
    bottom = (this.originPoint.y > this.endPoint.y)
      ? this.originPoint.y
      : this.endPoint.y;
    left = (this.originPoint.x < this.endPoint.x)
      ? this.originPoint.x
      : this.endPoint.x;
    return {
      top,
      right,
      bottom,
      left,
    };
  }

  setEndPoint(x, y) {
    this.endPoint.x = x;
    this.endPoint.y = y;
  }

  get canDraw() {
    return (this.endPoint.x !== undefined) && (this.endPoint.y !== undefined);
  }
}

// Returns two points to draw a triangle, assuming an origin point of 0
function getArrowPoints(originAngle, length, arrowAngle = 315) {
  let angleA, angleB, pA, pB;
  angleA = originAngle + toRadians(arrowAngle);
  angleB = originAngle - toRadians(arrowAngle);
  pA = getVectorPoint(angleA, length);
  pB = getVectorPoint(angleB, length);
  return { pA, pB };
}
