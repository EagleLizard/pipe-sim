
import { Entity, EntityBoundingRect } from '../entity';
import { ENTITY_ENUM } from '../entity-enum';

import { boundingRectToRect } from '../../geometry/collision';
import { Rect } from '../../geometry/shapes';

interface BoundingRectOptions {
  boundingRect: EntityBoundingRect;
}

export class BoundingRect extends Entity {
  rect: Rect;
  _boundingRect: EntityBoundingRect;
  constructor(id: number | string, options: BoundingRectOptions) {
    super(id, ENTITY_ENUM.BOUNDING_RECT);
    this._boundingRect = options.boundingRect;
    this.rect = boundingRectToRect(options.boundingRect);
  }

  draw(ctx: CanvasRenderingContext2D) {
    let lastStyle;
    lastStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.moveTo(this.rect.x, this.rect.y);
    ctx.lineTo(this.rect.x + this.rect.width, this.rect.y);
    ctx.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);
    // ctx.moveTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);
    ctx.lineTo(this.rect.x, this.rect.y + this.rect.height);
    ctx.lineTo(this.rect.x, this.rect.y);
    // ctx.lineTo(this.rect.x, this.rect.y + this.rect.height);
    ctx.stroke();
    // reset style
    ctx.strokeStyle = lastStyle;
  }

  get boundingRect() {
    return this._boundingRect;
  }
}
