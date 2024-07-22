export class Sine {

  constructor(init_event) {
    this.init_event = init_event;
    this.phase = 0.0;
  }

  pop() {
    this.phase += 2 * Math.PI * 440 / 48000;
    return Math.cos(this.phase);
  }

}
