import React from "react";

export default function ControlPanel({ controls, onChange }) {
  const setMode = (mode) => onChange({ p1Mode: mode });

  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1"
          id="p1_on"
          checked={controls.p1Mode === "ON"}
          onChange={() => setMode("ON")}
        />
        <label className="form-check-label" htmlFor="p1_on">
          p1: ON
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="p1"
          id="p1_hush"
          checked={controls.p1Mode === "HUSH"}
          onChange={() => setMode("HUSH")}
        />
        <label className="form-check-label" htmlFor="p1_hush">
          p1: HUSH
        </label>
      </div>
    </div>
  );
}
