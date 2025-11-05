import React from "react";

export default function PreprocInput({ value, onChange }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header py-2">
        <strong>Text to preprocess</strong>
      </div>
      <div className="card-body">
        <textarea className="e.g.@speed 1.5 and keep <p1_Radio> after var cpm"
        style={{ width: "100%", minHeight: 240, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"}} value={value} onChange={(e) => onChange?.(e.target.value)}/>
      </div>
    </div>
  );
}
