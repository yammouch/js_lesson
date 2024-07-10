export class StringModel {

  constructor(divRatio) {
    this.inow = 0;
    this.on = false;
    let bufsize = Math.ceil(divRatio);
    let weight = bufsize - divRatio;
    this.coeff = [1-weight, weight];
    this.wave = new Float32Array(bufsize);
    this.buf = new Float32Array(bufsize + 1);
    for (let i = 0; i < bufsize; i++) {
      if (i < bufsize / 2) {
        this.wave[i] = 1.0;
      } else {
        this.wave[i] = -1.0;
      }
    }
    this.excite = 0;
    this.decay = 1 - 1e-1;
  }

  pop() {
    this.inow--;
    if (this.inow < 0) {
      this.inow += this.buf.length;
    }
    if (0 < this.excite) {
      this.buf[this.inow] = this.wave[--this.excite];
    } else {
      let acc = 0.0;
      for (let i = this.inow-1, j = this.coeff.length-1; 0 <= j; i--, j--) {
        if (i < 0) {
          i += this.buf.length;
        }
        acc += this.coeff[j]*this.buf[i];
      }
      this.buf[this.inow] = this.decay*acc;
    }
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
    this.strs[e.data.note].excite = this.strs[e.data.note].wave.length;
    this.strs[e.data.note].decay = 1 - 5e-3;
  }

  off(e) {
    this.strs[e.data.note].decay = 1 - 1e-1;
  }

  pop() {
    let sum = 0.0;
    for (let j = 0; j < this.strs.length; j++) {
      this.strs[j].pop();
    }
    let to_lo = new Float32Array(this.strs.length);
    for (let i = this.strs.length-1; 0 < i; i--) {
      to_lo[i-1] = to_lo[i] + this.strs[i].buf[this.strs[i].inow];
    }
    for (let i = 0; i < this.strs.length-1; i++) {
      this.strs[i].buf[this.strs[i].inow] += to_lo[i]*1e-2;
    }
    return to_lo[0] + this.strs[0].buf[this.strs[0].inow];
  }

}

