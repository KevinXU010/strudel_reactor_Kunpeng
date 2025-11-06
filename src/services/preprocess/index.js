export function preprocess(inputText, controls) {
  let text = String(inputText ?? "");
  const mode = controls?.p1Mode ?? "ON";

  let parsedFromText = 1;
  const m = text.match(/s*@speed\s+([0-9]*\.?[0-9]+)/i);
  if (m) {
    const v = parseFloat(m[1]);
    if (Number.isFinite(v) && v > 0) parsedFromText = v;
  }
  text = text.replace(/s*@speed\s+[0-9]*\.?[0-9]+\s*$/gim, "");

  const sliderMult = controls?.speedMult;
  const speedMult = (Number.isFinite(sliderMult) && sliderMult > 0)
    ? sliderMult
    : parsedFromText;

  const vol = Number.isFinite(controls?.volume) ? controls.volume : 1.0;

  let inject = "";
  if (mode === "ON" && speedMult !== 1) {
    inject += `\n //speed x${speedMult}\ncpm = cpm * ${speedMult};\n`;
  }
  if (vol !== 1) {
    inject += `\n //volume ×${vol}\nall(x => x.gain(${vol}));\n`;
  }

  if (!text.includes("<p1_Radio>")) return text;
  return text.replace(/<p1_Radio>\s*/g, inject);
}





