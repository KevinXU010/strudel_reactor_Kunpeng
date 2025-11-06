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
  let mult =
    Number.isFinite(sliderMult) && sliderMult > 0 ? sliderMult : parsedFromText;

 
  const inject =
    mode === "ON" && mult !== 1
      ? `\n// [auto] speed x${mult}\ncpm = cpm * ${mult};\n`
      : "";

  if (!text.includes("<p1_Radio>")) return text;
  return text.replace(/<p1_Radio>\s*/g, inject);
}





