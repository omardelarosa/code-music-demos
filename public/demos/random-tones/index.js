import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";
import { DEFAULT_SEQUENCE_BPM } from "../../lib/common/constants.js";

function init() {
    bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);

    let note = null;
    let $el = document.querySelector(".frequency");

    function rand() {
        return Math.round(Math.random() * 1000) + 40;
    }

    const synthOpts = {
        oscillator: {
            type: "amtriangle",
            harmonicity: 0.5,
            modulationType: "sine",
        },
        envelope: {
            attackCurve: "exponential",
            attack: 0.05,
            decay: 0.2,
            sustain: 0.2,
            release: 1.5,
        },
        portamento: 0.05,
    };
    // console.log("synthOpts: ", synthOpts);
    let synth = new Tone.FMSynth().toDestination();

    const now = Tone.now();
    let t = 0.0;
    const loop = new Tone.Loop((time) => {
        // triggered every eighth note.
        note = rand();
        const noteName = new Tone.Frequency(note, "midi").toNote();
        t += 0.5;

        synth.triggerAttackRelease(note, "8n");
        $el.innerHTML = `${note}hz`;
    }, "4n").start(0);

    Tone.Transport.start();

    Tone.Transport.bpm.value = DEFAULT_SEQUENCE_BPM;
}

(function () {
    init();
})();
