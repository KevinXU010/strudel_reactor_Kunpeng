import React from "react";

export default function EditorPane() {
  return (
    <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
      <div id="editor" />
      <div id="output" />
    </div>
  );
}
