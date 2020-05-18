
import { Entity } from '../entity';
import { ENTITY_ENUM } from '../entity-enum';

import { boundingRectToRect } from '../../geometry/collision';

export class BoundingRect extends Entity {
  constructor(id, options) {
    super(id, ENTITY_ENUM.BOUNDING_RECT);
    this.rect = boundingRectToRect(options.boundingRect);
  }

  draw(ctx) {
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
}
