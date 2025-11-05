import React from "react";

export default function TransportBar({
  onPreprocess,
  onProcPlay,
  onPlay,
  onStop,
}) { 
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header py-2">
        <strong>Transport</strong>
      </div>
      <div className="card-body">
        <div className="d-grid gap-2">
          <div className="btn-group" role="group" aria-label="Preprocess actions">
            <button onClick={onPreprocess} className="btn btn-primary btn-sm">Preprocess</button>
            <button onClick={onProcPlay} className="btn btn-primary btn-sm">Proc&nbsp;&amp;&nbsp;Play</button>
          </div>
          <div className="btn-group" role="group" aria-label="Transport">
            <button onClick={onPlay} className="btn btn-outline-secondary btn-sm">Play</button>
            <button onClick={onStop} className="btn btn-outline-secondary btn-sm">Stop</button>
          </div>
        </div>
      </div>
    </div> 
  );
}
