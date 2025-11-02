import React from "react";

export default function PreprocInput() {
  return (
    <textarea
      id="proc"
      className="form-control"
      style={{ width: "100%", minHeight: 240, fontFamily: "monospace" }}
      placeholder="Text to preprocess..."
    />
  );
}
