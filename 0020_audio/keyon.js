import { Source } from "./sub01.js";

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
