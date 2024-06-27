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
    let src = [];
    this.port.onmessage = (e) => {
      console.log(e.data);
      if (e.data.cmd == "on") {
        console.log(e.data.note);
        console.log(src[e.data.note]);
        console.log(src);
        this.src[e.data.note].excite = 0;
        this.src[e.data.note].decay = 1 - 5e-3;
      } else if (e.data.cmd == "off") {
        this.src[e.data.note].decay = 1 - 1e-1;
      } else if (e.data.cmd == "init") {
        let note = -31;
        //this.src = [];
        for (let i = 0; i <= 37; i++, note++) {
          //this.src.push
          src.push
          ( new Source
            ( e.data.sampleRate
            / (e.data.master * 2**(note/12))
            ));
        }
        console.log(src);
        console.log(src[0]);
        console.log(src[37]);
        this.src = src;
      }
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];
    for (let i = 0; i < channel.length; i++) {
      let sum = 0.0;
      for (let j = 0; j < this.src.length; j++) {
        sum += this.src[j].pop();
      }
      channel[i] = 0.2*sum;
    }
    return true;
  }

}

registerProcessor("sq-pr", SquareProcessor);
