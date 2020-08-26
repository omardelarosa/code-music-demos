import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";
import { createInstruments } from "../../lib/sqcr-demo/instruments.js";
import {
    NOTE_KICK,
    NOTE_CLAP,
    NOTE_SNARE,
    NOTE_HAT,
    DRAKE,
    THUG,
    beatFromTick,
    kicks,
    snares,
    hats,
    MC_HATS,
    _sample,
} from "../../lib/sqcr-demo/utils.js";

console.log("Tonal", Tonal);

const DEFAULT_BPM = 60;
const GRID_RESOLUTION = 16;

const instruments = createInstruments();

const loop_kicks = new Tone.Loop(
    (() => {
        // Private variable for ticker
        let tick = 0;
        let kick_pattern = _sample(kicks);
        let snares_pattern = _sample(snares);
        return (time) => {
            let t = tick % GRID_RESOLUTION;
            // Randomly switch pattern on the 0
            if (t === 0) kick_pattern = _sample(kicks);
            if (kick_pattern[t]) {
                // Play kick beat
                instruments.sampler.triggerAttackRelease(NOTE_KICK, time);
            }

            // Randomly switch pattern on the 0
            if (t === 0) snares_pattern = _sample(snares);
            if (snares_pattern[t]) {
                // Play snare beat
                instruments.sampler.triggerAttackRelease(NOTE_CLAP, time);
            }
            tick += 1;
        };
    })(),
    "16n"
).start(0);

const loop_hats = new Tone.Loop((time) => {
    // Hi-hats
    let hats_pattern = hats[MC_HATS.peekID()];
    let num_beats = hats_pattern[1];
    let note_duration = hats_pattern[0];
    const note = Tone.Time(4 / note_duration).toNotation();

    for (let i = 0; i < num_beats; i++) {
        let scheduled_time =
            time + Tone.Time(4 / note_duration).toSeconds() * i;
        instruments.sampler.triggerAttackRelease(
            NOTE_HAT,
            note,
            scheduled_time
        );
    }

    MC_HATS.next();
}, "4n").start(0);

Tone.Transport.start();

Tone.Transport.bpm.value = DEFAULT_BPM;

bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);
