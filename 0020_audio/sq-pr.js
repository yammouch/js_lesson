// white-noise-processor.js
class SquareProcessor extends AudioWorkletProcessor {

  constructor () {
    super();
    this.phase = 0;
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];
    for (let i = 0; i < channel.length; i++) {
      if (this.phase < 50) {
        channel[i] = -1.0;
      } else {
        channel[i] = 1.0;
      }
      if (99 <= this.phase) {
        this.phase = 0;
      } else {
        this.phase++;
      }
    }
    return true;
  }
}

registerProcessor("sq-pr", SquareProcessor);
