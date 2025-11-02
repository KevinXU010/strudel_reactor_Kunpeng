
export function preprocess(inputText, controls) {
  const text = String(inputText ?? "");
  const mode = controls?.p1Mode ?? "ON";

  const p1Replacement = mode === "HUSH" ? "_" : "";

  let output = text.replaceAll("<p1_Radio>", p1Replacement);
  return output;
}
