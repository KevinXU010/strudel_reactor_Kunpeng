export function preprocess(inputText, controls) {
  let text = String(inputText ?? "");
  const mode = controls?.p1Mode ?? "ON";

  // // Read speed control command (ignores case, supports decimals)
  const mSpeed = text.match(/\s*@speed\s+([0-9]*\.?[0-9]+)/i);

  // Delete all lines containing the `@speed` directive to avoid entering the final code.
  text = text.replace(/^\s*\s*@speed\s+[0-9]*\.?[0-9]+\s*$/gim, "");

  
  const inject =
    mode === "ON" && mSpeed
      ? `\n//speed up x${mSpeed[1]}\ncpm = cpm * ${mSpeed[1]};\n`
      : "";

 
  if (!text.includes("<p1_Radio>")) return text;
  return text.replace(/<p1_Radio>\s*/g, inject);
}




