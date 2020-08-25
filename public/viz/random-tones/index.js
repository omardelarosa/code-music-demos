import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";

function init() {
    bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);

    let note = null;
    let duration = 500;
    let $el = document.querySelector(".frequency");

    function rand() {
        return Math.round(Math.random() * 60) + 100;
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
        t += 0.5;
        // console.log("now: ", now);
        synth.triggerAttackRelease(note, time);
        $el.innerHTML = `${Math.round(
            new Tone.Frequency(note, "midi").valueOf()
        )}hz`;
    }, "8n").start(0);
    Tone.Transport.start();
}

(function () {
    init();
})();
