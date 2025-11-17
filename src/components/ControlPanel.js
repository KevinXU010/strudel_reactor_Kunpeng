import React from "react";

export default function ControlPanel({ controls, onChange }) {
  const mode = controls?.p1Mode ?? "ON";

  const handleSelect = (e) => {
    const value = e.target.value;      
    onChange?.({ p1Mode: value });
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header py-2"><strong>Controls</strong></div>
      <div className="card-body">
        <div className="mb-2">
          <select id="p1ModeSelect" className="form-select" value={mode} onChange={handleSelect}>
            <option value="ON">p1: ON</option>
            <option value="HUSH">p1: HUSH</option>
          </select>
        </div>
      </div>
    </div>
  );
}
