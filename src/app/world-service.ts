
import { World } from '../world/world';

const FPS = 60;

let world: World;

init();

export {
  world
};

function init() {
  let tickInterval: number;
  tickInterval = 1000 / FPS;
  world = new World(tickInterval);
}
