class Source {

  constructor(divRatio) {
    this.phase = 0;
    this.on = false;
    this.bufsize = Math.ceil(divRatio);
    this.weight = this.bufsize - divRatio;
    this.wave = new Float32Array(this.bufsize);
    this.buf = new Float32Array(this.bufsize);
    for (let i = 0; i < this.bufsize; i++) {
      if (i < this.bufsize / 2) {
        this.wave[i] = 1.0;
      } else {
        this.wave[i] = -1.0;
      }
    }
    this.excite = this.bufsize;
    this.decay = 1 - 1e-1;
  }

  pop() {
    let retval;
    retval = this.buf[this.phase];
    let phaseNext = this.phase + 1;
    if (this.buf.length <= phaseNext) {
      phaseNext = 0;
    }
    if (this.excite < this.bufsize) {
      this.buf[this.phase] = this.wave[this.excite++];
    } else {
      this.buf[this.phase]
      = this.decay
      * ( (1-this.weight)*this.buf[this.phase]
        + this.weight*this.buf[phaseNext] );
    }
    this.phase = phaseNext;
    return retval;
  }

}

class SquareProcessor extends AudioWorkletProcessor {

  constructor() {
    super();
    this.src = new Source(100.1);
    //this.src = new Source(99.9);
    //this.src = new Source(100);
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
