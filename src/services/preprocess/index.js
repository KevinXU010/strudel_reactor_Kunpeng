
export function preprocess(inputText, controls) {
  const text = String(inputText ?? "");
  const mode = controls?.p1Mode ?? "ON";

  const p1OnBlock = `
    p1:
    n("0 2 4 6 7 6 4 2")
    .s("supersaw")
    .postgain(2.0)
    `;

  const hushBlock = ``;

  const token = /<p1_Radio>\s*/g;
  const replacement = mode === "ON" ? `\n// [auto] p1 on\n${p1OnBlock}\n` : hushBlock;

  if (!token.test(text)) {
    return text + replacement;
  }
  return text.replace(token, replacement);
}
