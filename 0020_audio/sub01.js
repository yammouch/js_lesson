export class StringModel {

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

export class Source {

  constructor(e) {
    this.strs = [];
    let note = -31;
    for (let i = 0; i <= 37; i++, note++) {
      this.strs.push
      ( new StringModel
        ( e.data.sampleRate
        / (e.data.master * 2**(note/12))
        ));
    }
  }

  on(e) {
    this.strs[e.data.note].excite = 0;
    this.strs[e.data.note].decay = 1 - 5e-3;
  }

  off(e) {
    this.strs[e.data.note].decay = 1 - 1e-1;
  }

  pop() {
    let sum = 0.0;
    for (let j = 0; j < this.strs.length; j++) {
      sum += this.strs[j].pop();
    }
    return sum;
  }

}

