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

  if (!text.includes("<p1_Radio>")) return text;
  return text.replace(/<p1_Radio>\s*/g, inject);
}





