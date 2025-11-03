import React from "react";

export default function PreprocInput({ value, onChange }) {
  return (
    <textarea className="form-control" rows="15" placeholder="<p1_Radio> will be processed…" 
    style={{ width: "100%", minHeight: 240, fontFamily: "monospace" }} value={value} onChange={(e) => onChange?.(e.target.value)}/>
  );
}
