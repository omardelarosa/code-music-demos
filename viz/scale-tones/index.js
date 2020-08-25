import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

function rand() {
    return NOTES[Math.round(Math.random() * (NOTES.length - 1))];
}

function init() {
    bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);
    let note = null;
    let $el = document.querySelector(".frequency");

    let synth = new Tone.FMSynth().toDestination();

    const now = Tone.now();
    let t = 0.0;
    const loop = new Tone.Loop((time) => {
        // triggered every eighth note.
        note = rand();
        t += 0.5;
        synth.triggerAttackRelease(note, time);
        $el.innerHTML = `${Math.round(
            new Tone.Frequency(note, "note").valueOf()
        )}hz`;
    }, "8n").start(0);
    Tone.Transport.start();
}

(function () {
    init();
})();
