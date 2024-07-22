import { Sine } from "./sine_engine.js";

class SineProcessor extends AudioWorkletProcessor {

  constructor() {
    super();
    this.port.onmessage = (e) => {
      console.log(e.data);
      if (e.data.cmd == "init") {
        this.sine = new Sine(e);
      }
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];
    for (let i = 0; i < channel.length; i++) {
      let sum = this.sine.pop();
      channel[i] = 0.2*sum;
    }
    return true;
  }

}

registerProcessor("sine-worklet", SineProcessor);
