export class Sine {

  constructor(init_event) {
    this.init_event = init_event;
    this.phase = 0.0;
    this.coeffs = new Float32Array(10);
    for (let i = 0; i < this.coeffs.length; i++) {
      this.coeffs[i] = 1.0/((2*i+2)*(2*i+3));
    }
  }

  sine(x) {
    const xSquared = x*x;
    let acc = 1.0;
    for (let i = this.coeffs.length-1; 0 <= i; i--) {
      acc = 1.0 - acc*xSquared*this.coeffs[i];
    }
    acc *= x;
    return acc;
  }

  pop() {
    this.phase += 2 * Math.PI * 440 / 48000;
    if (2 * Math.PI < this.phase) {
      this.phase -= 2 * Math.PI;
    }
    return this.sine(this.phase);
  }

}
