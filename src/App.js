import './App.css';
import { useEffect, useRef,useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import { preprocess } from './services/preprocess';
import TransportBar from './components/TransportBar';
import ControlPanel from './components/ControlPanel';
import PreprocInput from './components/PreprocInput';
import EditorPane from './components/EditorPane';
import DJControl from "./components/DJControl";
import VolumeControl from "./components/VolumeControl";

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

const hasRun = useRef(false);
const [controls, setControls] = useState({ p1Mode: "ON" });
const [songText, setSongText] = useState("");

function parseSpeedFromText(text) {
  const m = String(text ?? "").match(/s*@speed\s+([0-9]*\.?[0-9]+)/i);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return Number.isFinite(v) && v > 0 ? v : null;
}

function Proc(override) {
        const effective = override ?? controls;
        const replaced = preprocess(songText, effective);
        globalEditor.setCode(replaced);
    }
    function ProcAndPlay(override) {
        if (globalEditor?.repl.state.started){
            Proc(override);
            globalEditor.evaluate();
        }
                    
    }

useEffect(() => {
 

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            }); 
        
        setSongText(stranger_tune);
        const replaced = preprocess(stranger_tune, { p1Mode: "ON" });
        globalEditor?.setCode(replaced);
       
    }

}, []);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocInput value={songText}  onChange={(txt) => {setSongText(txt); const parsed = parseSpeedFromText(txt); 
                            if (parsed != null) {
                                if (controls.speedFrom !== 'slider' || parsed !== (controls.speedMult ?? 1)) {const next = { ...controls, speedMult: parsed, speedFrom: 'text' };
                                setControls(next);}}}}/>
                    </div>
                    <div className="col-md-4">
                         <TransportBar onPreprocess={Proc} onProcPlay={ProcAndPlay} onPlay={() => globalEditor?.evaluate()} onStop={() => globalEditor?.stop()}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <EditorPane />
                    </div>
                    <div className="col-md-4">
                        <DJControl value={controls.speedMult ?? 1.0} onChange={(mult) => {const next = { ...controls, speedMult: mult };setControls(next);ProcAndPlay(next);}}/>
                    </div>
                    <div className="col-md-4">
                        <VolumeControl value={controls.volume ?? 1.0} onChange={(v) => {const next = { ...controls, volume: v }; setControls(next); ProcAndPlay(next); }}/>
                    </div>
                    <div className="col-md-4">
                        <ControlPanel controls={controls} onChange={(patch) => {const next = { ...controls, ...patch }; setControls(next); ProcAndPlay(next); }}/>  
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}