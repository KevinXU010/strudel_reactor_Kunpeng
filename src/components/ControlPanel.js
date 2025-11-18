import React from "react";

export default function ControlPanel({ controls, onChange }) {
  const mode = controls?.p1Mode ?? "ON";
  const style = (controls?.style ?? "DEFAULT").toUpperCase();
  const guitarOn = style === "GUITAR";

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header py-2"><strong>Controls</strong></div>
      <div className="card-body">
        <div className="mb-3">
          <select id="p1ModeSelect" className="form-select" value={mode} onChange={(e) => onChange?.({ p1Mode: e.target.value })}>
            <option value="ON">p1: ON</option>
            <option value="HUSH">p1: HUSH</option>
          </select>
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="guitarSwitch" checked={guitarOn} onChange={(e) => onChange?.({ style: e.target.checked ? "GUITAR" : "DEFAULT" })}/>
          <label className="form-check-label" htmlFor="guitarSwitch">
           🎸 Guitar layer
          </label>
        </div>
      </div>
    </div>
  );
}
