
import { Runtime, TickCb } from './runtime';
import { Pipe } from './entities/pipe/pipe';

import { isPointInBoundingRect } from './geometry/collision';
import { Entity } from './entities/entity';
import { Point } from './geometry/shapes';

export class World {
  runtime: Runtime;
  entities: Entity[];
  idCounter: number;
  constructor(tickInterval: number) {
    this.runtime = new Runtime({
      tickInterval,
    });
    this.entities = [];
    this.idCounter = 0;
  }

  onTick(cb: TickCb) {
    return this.runtime.onTick(cb);
  }

  play() {
    this.runtime.start();
  }

  pause() {
    this.runtime.stop();
  }

  getId() {
    return this.idCounter++;
  }

  createPipe(x: number, y: number) {
    let pipe;
    pipe = new Pipe(this.getId(), { x, y });
    this.entities.push(pipe);
    return pipe;
  }

  getBoundingCollisionsByPoint(point: Point) {
    let collidedEntities;
    collidedEntities = this.entities.reduce((acc, curr) => {
      let collision, boundingRect;
      boundingRect = curr.boundingRect;
      collision = isPointInBoundingRect(point, curr.boundingRect);
      if(collision) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return collidedEntities;
  }

  get running() {
    return this.runtime.running;
  }

  get epochMs() {
    return this.runtime.epochMs;
  }

}
