# Strudel Reactor — React × Strudel.cc

This is a React UI and preprocessor for the native Strudel.cc REPL.

It allows you to control songs with a clean and responsive UI.

> The sample song for this project is from the Strudel Bakery community: https://strudel.cc/bakery/

---

## Function Overview

### Text to preprocess
Paste or edit Strudel song code. Use the special placeholder **`<p1_Radio>`** to specify the preprocessor injection location (**tempo / volume / mute / guitar layers** will be inserted here).  
If the placeholder is missing, the injection is automatically appended to the **end of the text** to ensure availability.

### Transport
- **Preprocess** – Performs preprocessing only, does not play.
- **Proc & Play** – Preprocesses and plays immediately.
- **Play / Stop** – Plays / stops the current REPL code.

### DJ Control — Play Speed
- Slider with **− / + / Reset**, internally using **CPM (cycles per minute)** multiplication for speed adjustment.  
- Also supports writing **`@speed <number>`** in the text (e.g., `@speed 1.25`); it stays linked to the slider for synchronization.

### Volume
Global gain multiplication with **− / + / Reset**.

### Controls
- **p1 Mode**
  - **p1: ON** – Normal preprocessing.
  - **p1: HUSH** – Instant mute *(this call sets the passed volume to 0; switching back to ON automatically restores the previous volume)*.
- **🎸 Guitar layer switch**  
  When enabled, the preprocessor automatically injects a guitar track as accompaniment; when disabled, it returns to the original arrangement.

### Clear React Architecture (“Thinking in React”)
The initial single-file prototype is broken down into independent components:
- **PreprocInput** (preprocessing input box)
- **TransportBar** (preprocessing / playback control)
- **DJControl** (speed)
- **VolumeControl** (volume)
- **ControlPanel** (p1 mode + guitar switch)
- **EditorPane** (Strudel REPL container)

---

## Preprocessing Principle

Dynamically construct the injection string based on **song text + UI control state**:

- Parse `@speed <n>` in the text and the **speed slider** value, and inject:
  ```js
  cpm = cpm * n;

Usage Guide:

Paste or edit the song code in Text to preprocess. It’s recommended to keep <p1_Radio> as the injection point.

Optionally, add instructions like @speed 1.25 to the text as a base tempo.

Changing the play sped by using DJ Control and adjust the overall volume using Volume.

In Controls, select p1: ON or p1: HUSH; enable Guitar layer to overlay a guitar accompaniment.

Click Proc & Play to preprocess and play. Use Play/Stop to start and stop the REPL.