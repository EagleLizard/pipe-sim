
const DEFAULT_TICK_MS = 1000 / 30; // 30fps

export class Runtime {
  constructor(config) {
    config = config || {};
    this.tickInterval = config.tickInterval || DEFAULT_TICK_MS;
    this.tickFns = [];
    this.tickFnCounter = 0;
    this.running = false;
    this.epochMs = 0;
    this.lastStartMs = undefined;
  }

  onTick(cb) {
    let tickId;
    tickId = this.tickFnCounter++;
    this.tickFns.push({
      cb,
      id: tickId,
    });
    return () => {
      let foundIdx;
      foundIdx = this.tickFns.findIndex(val =>
        val.id === tickId
      );
      if(foundIdx !== -1) {
        this.tickFns.splice(foundIdx, 1);
      }
    };
  }

  start() {
    this.running = true;
    const loop = (running) => {
      if(!running) {
        return;
      }
      if(this.lastStartMs === undefined) {
        this.lastStartMs = Date.now();
      } else {
        this.epochMs +=  Date.now() - this.lastStartMs;
      }
      this.lastStartMs = Date.now();
      this.tickFns.forEach(tickFn => {
        tickFn.cb();
      });
      setTimeout(() => {
        loop(this.running);
      }, this.tickInterval);
    };
    loop(this.running);
  }

  stop() {
    this.running = false;
    this.lastStartMs = undefined;
  }
}
