
const DEFAULT_TICK_MS = 1000 / 30; // 30fps

interface RuntimeConfig {
  tickInterval: number;
}

export declare type TickCb = (...args: unknown[]) => unknown;

interface TickFn {
  id: number | string;
  cb: TickCb;
}

const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  tickInterval: DEFAULT_TICK_MS,
};

export class Runtime {
  tickInterval: number;
  tickFns: TickFn[];
  tickFnCounter: number;
  running: boolean;
  epochMs: number;
  lastStartMs: number;
  constructor(config?: RuntimeConfig) {
    config = config || DEFAULT_RUNTIME_CONFIG;
    this.tickInterval = config.tickInterval;
    this.tickFns = [];
    this.tickFnCounter = 0;
    this.running = false;
    this.epochMs = 0;
    this.lastStartMs = undefined;
  }

  onTick(cb: TickCb) {
    let tickId: number;
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
    const loop = (running: boolean) => {
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
