
import { Entity } from '../entity';
import { ENTITY_ENUM } from '../entity-enum';

const DEFAULT_SIZE = 50;

export class Station extends Entity {
  constructor(id, options) {
    super(id);
    this.x = options.x;
    this.y = options.y;
    this.size = options.size || DEFAULT_SIZE;
    this.radius = Math.ceil(this.size / 2);
    this.entityType = ENTITY_ENUM.STATION;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  get top() {
    const x = this.x;
    const y = this.y - this.radius;
    return { x, y };
  }

  get left() {
    const x = this.x - this.radius;
    const y = this.y;
    return { x, y };
  }
}
