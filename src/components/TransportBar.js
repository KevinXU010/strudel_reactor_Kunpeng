import React from "react";

export default function TransportBar({
  onPreprocess,
  onProcPlay,
  onPlay,
  onStop,
}) {
  return (
    <nav>
      <button onClick={onPreprocess} className="btn btn-outline-primary">
        Preprocess
      </button>
      <button onClick={onProcPlay} className="btn btn-outline-primary">
        Proc &amp; Play
      </button>
      <br />
      <button onClick={onPlay} className="btn btn-outline-primary">
        Play
      </button>
      <button onClick={onStop} className="btn btn-outline-primary">
        Stop
      </button>
    </nav>
  );
}
