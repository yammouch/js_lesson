class Source {

  constructor() {
    this.phase = 0;
  }

  pop() {
    let retval;
    if (this.phase < 50) {
      retval = -1.0;
    } else {
      retval = 1.0;
    }
    if (99 <= this.phase) {
      this.phase = 0;
    } else {
      this.phase++;
    }
    return retval;
  }

}

class SquareProcessor extends AudioWorkletProcessor {

  constructor () {
    super();
    this.src = new Source();
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];
    for (let i = 0; i < channel.length; i++) {
      channel[i] = this.src.pop();
    }
    return true;
  }
}

registerProcessor("sq-pr", SquareProcessor);
