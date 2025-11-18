export function preprocess(inputText, controls) {
  let text = String(inputText ?? "");
  const mode = controls?.p1Mode ?? "ON"; //Read p1 mode, default is ON

  // Search the text for commands in the form of "@speed".
  let parsedFromText = 1;
  const m = text.match(/@speed\s+([0-9]*\.?[0-9]+)/i);
  if (m) {
    const v = parseFloat(m[1]);
    if (Number.isFinite(v) && v > 0) parsedFromText = v;
  }
  text = text.replace(/@speed\s+[0-9]*\.?[0-9]+\s*$/gim, "");

  //Get the value of DJControl from the control.
  const sliderMult = controls?.speedMult;
  const speedMult = (Number.isFinite(sliderMult) && sliderMult > 0) ? sliderMult : parsedFromText;

  const vol = Number.isFinite(controls?.volume) ? controls.volume : 1.0;
  
  let inject = "";
  if (mode === "ON" && speedMult !== 1) {
    inject += `\n //speed x${speedMult}\n cpm = cpm * ${speedMult};\n`;
  }
  if (vol !== 1) {
    inject += `\n //volume x${vol}\n all(x => x.gain(${vol}));\n`;
  }

  const style = String(controls?.style ?? "DEFAULT").toUpperCase();
  if (mode !== "HUSH") {
      if (style === "GUITAR") {
      
      inject += `
      \n//style: guitar
      guitar:
      note("[f4 g4 f4 g4 ab4 g4 f4@2] [eb4 f4 eb4 f4 c4 db4 eb4@2]")
        .slow(4)
        .sound("gm_electric_guitar_clean:4")
        .lpf(2000)
        .pan(0.6)
        .gain(0.9)
        \n`;
    }
  }

  const token = /<p1_Radio>\s*/g;
  if (token.test(text)) {
    return text.replace(token, inject);
  }
  return text + inject;
}





