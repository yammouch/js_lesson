export class StringModel {

  constructor(divRatio) {
    this.inow = 0;
    this.bufsize = Math.ceil(divRatio) + 1;
    let weight = this.bufsize - divRatio;
    this.coeff = [1-weight, weight];
    this.wave = new Float32Array(this.bufsize - 1);
    this.buf = new Float32Array(this.bufsize);
    for (let i = 0; i < this.bufsize; i++) {
      if (i < (this.bufsize - 1) / 2) {
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
      this.buf[this.inow] = this.wave[this.excite--];
    } else {
      let acc = 0.0;
      for (let i = coeff.length-1, j = inow - 1; 0 <= i; i--, j--) {
        if (j < 0) {
          j += this.buf.length;
        }
        acc += this.coeff[i]*this.buf[j];
      }
    }
    return buf[this.inow];
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
      sum += this.strs[j].pop();
    }
    return sum;
  }

}

