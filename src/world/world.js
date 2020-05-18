
import { Graph } from '@dagrejs/graphlib';

import { Runtime } from './runtime';
import { Station } from './entities/station/station';
import { Pipe } from './entities/pipe/pipe';

import { isPointInBoundingRect } from './geometry/collision';

export class World {
  constructor() {
    this.graph = new Graph({
      multigraph: true,
    });
    this.runtime = new Runtime();
    this.entities = [];
    this.idCounter = 0;
  }

  onTick(cb) {
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

  createStation(x, y) {
    let station;
    station = new Station(this.idCounter++, {
      x,
      y,
    });
    this.entities.push(station);
    return station;
  }

  createPipe(x, y) {
    let pipe;
    pipe = new Pipe(this.getId(), { x, y });
    this.entities.push(pipe);
    return pipe;
  }

  getBoundingCollisionsByPoint(point) {
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
