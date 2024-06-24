class Source {

  constructor() {
    this.phase = 0;
    this.on = false;
    this.wave = new Float32Array(100);
    this.buf = new Float32Array(this.wave.length);
    for (let i = 0; i < 50; i++) {
      this.wave[i] = 1.0;
    }
    for (let i = 50; i < 100; i++) {
      this.wave[i] = -1.0;
    }
    this.excite = this.wave.length;
    this.decay = 1 - 1e-1;
  }

  pop() {
    let retval;
    retval = this.buf[this.phase];
    if (this.excite < this.buf.length) {
      this.buf[this.phase] = this.wave[this.excite++];
    } else {
      this.buf[this.phase] *= this.decay;
    }
    this.phase++;
    if (this.buf.length <= this.phase) {
      this.phase = 0;
    }
    return retval;
  }

}

class SquareProcessor extends AudioWorkletProcessor {

  constructor() {
    super();
    this.src = new Source();
    this.port.onmessage = (e) => {
      if (e.data == "on") {
        if (!this.src.on) {
          console.log("on");
          this.src.excite = 0;
          this.src.decay = 1 - 5e-3;
          this.src.on = true;
        }
        this.src.on = true;
      } else if (e.data == "off") {
        console.log("off");
        this.src.decay = 1 - 1e-1;
        this.src.on = false;
      }
    };
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
