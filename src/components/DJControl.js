import React from "react";

export default function DJControl({ value = 1.0, onChange }) {
  const min = 0.5, max = 9.0, step = 0.05;

  const handle = (e) => {
    const v = parseFloat(e.target.value);
    if (Number.isFinite(v)) onChange?.(v);
  };

  const reset = () => onChange?.(1.0);

  return (
    <div className="card mb-3 shadow-sm sticky-col">
      <div className="card-header py-2">
        <strong>DJ Control</strong>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="small text-muted">Play Speed</div>
          <div className="fw-semibold">x{value.toFixed(2)}</div> 
        </div>
        <input type="range" className="form-range" min={min} max={max} step={step} value={value} onChange={handle} />
        <div className="d-flex gap-2 mt-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onChange?.(Math.max(min, +(value - step).toFixed(2)))}>
            -
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onChange?.(Math.min(max, +(value + step).toFixed(2)))}>
            +
          </button>
          <button className="btn btn-light btn-sm ms-auto" onClick={reset}>
            Reset 
          </button>
        </div>
      
      </div>
    </div>
  );
}
