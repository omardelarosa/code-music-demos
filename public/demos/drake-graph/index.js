import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";
import { MarkovChain } from "../../lib/Markov.js";
import { createInstruments } from "../../lib/sqcr-demo/instruments.js";
import {
    DEFAULT_SEQUENCE_BPM,
    DEFAULT_GRID_RESOLUTION,
} from "../../lib/common/constants.js";
import {
    NOTE_KICK,
    NOTE_CLAP,
    // NOTE_SNARE,
    NOTE_HAT,
    DRAKE,
    // THUG,
    // beatFromTick,
    kicks,
    snares,
    hats,
    MC_HATS,
    _sample,
} from "../../lib/sqcr-demo/utils.js";
import { MC_LEVELS } from "../../lib/matrix-16x8/utils.js";

let nodes = null;
let edges = null;
let network = null;
let selectedNodeId = null;

/* GRAPH */
// Graph
const G_DRAKE = {
    0: [0, 2],
    1: [1, 3, 2],
    2: [2, 4, 0],
    3: [4],
    4: [0],
};

const G_CHORDS = {
    0: [3, 3, 3, 5],
    1: [2, 5],
    2: [3],
    3: [4, 4, 4, 1, 1],
    4: [0, 0, 0, 5],
    5: [1, 6],
    6: [4],
};

const NOTES = [
    "F4",
    "G4",
    "A4",
    "A#4",
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "A#4",
    "C4",
    "D4",
    "E4",
];

const MC_VOX = new MarkovChain(G_DRAKE, DRAKE, 0);

const MC_CHORDS = new MarkovChain(G_CHORDS, NOTES, 0);

// create an array with nodes
function makeNodes(obj, labels) {
    const nodeStyle = {
        font: {
            color: "#000000",
            face: "sans-serif",
            size: 20,
        },
        color: {
            highlight: {
                border: "#ccfa99",
                background: "#faf099",
            },
        },
        image: {
            selected: "/assets/img/drake_selected.png",
            unselected: "/assets/img/drake.png",
        },
        size: 32,
    };
    const ids = Object.keys(obj).map(Number);
    return new vis.DataSet(
        ids.map((id) => {
            return {
                id,
                value: obj[id].length, // how many edges
                label: "Drake",
                ...nodeStyle,
            };
        })
    );
}

function makeEdges(obj) {
    const edgeOptions = {
        arrows: {
            to: {
                enabled: true,
            },
        },
        color: {
            highlight: "#99f9fa",
        },
    };

    const ids = Object.keys(obj).map(Number);
    const edges = [];

    // Make matrix
    ids.forEach((id) => {
        let values = {};
        obj[id].forEach((edge) => {
            if (!values[edge]) {
                values[edge] = 1;
            } else {
                values[edge] += 1;
            }
        });

        Object.keys(values).forEach((k) => {
            edges.push({
                from: id,
                to: Number(k),
                value: values[k],
                ...edgeOptions,
            });
        });
    });

    return edges;
}

function draw() {
    nodes = makeNodes(G_DRAKE, DRAKE);

    edges = makeEdges(G_DRAKE);

    // create a network
    const container = document.getElementById("graph");
    const data = {
        nodes: nodes,
        edges: edges,
    };
    const options = {
        nodes: {
            shape: "circularImage",
            size: 32,
        },
    };

    network = new vis.Network(container, data, options);
}

function init() {
    bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);

    draw();

    const instruments = createInstruments();

    let pSynth = new Tone.PolySynth({
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
    }).toDestination();

    const LOOP_CYCLE_DURATION = `${DEFAULT_GRID_RESOLUTION}n`;
    const HATS_CYCLE_DURATION = `${DEFAULT_GRID_RESOLUTION / 4}n`;
    const VOX_CYCLE_DURATION = `1m`;

    const loop_kicks = new Tone.Loop(
        (() => {
            // Private variable for ticker
            let tick = 0;
            let kick_pattern = _sample(kicks);
            let snares_pattern = _sample(snares);
            return (time) => {
                let t = tick % DEFAULT_GRID_RESOLUTION;
                // Randomly switch pattern on the 0
                if (t === 0) kick_pattern = _sample(kicks);
                if (kick_pattern[t]) {
                    // Play kick beat
                    instruments.sampler.triggerAttackRelease(
                        NOTE_KICK,
                        LOOP_CYCLE_DURATION
                    );
                }

                // Randomly switch pattern on the 0
                if (t === 0) snares_pattern = _sample(snares);
                if (snares_pattern[t]) {
                    // Play snare beat
                    instruments.sampler.triggerAttackRelease(
                        NOTE_CLAP,
                        LOOP_CYCLE_DURATION
                    );
                }
                tick += 1;
            };
        })(),
        LOOP_CYCLE_DURATION
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
    }, HATS_CYCLE_DURATION).start(0);

    const loop_vox = new Tone.Loop((time) => {
        // Vox
        const samp = MC_VOX.peekID();
        // triggered every eighth note.
        selectedNodeId = samp;

        network.selectNodes([selectedNodeId]);
        const note = DRAKE[samp];

        instruments.sampler.triggerAttackRelease(note, "1m");

        MC_VOX.next();

        // Chords
        const selectedNoteNodeId = MC_CHORDS.nextID();
        const root = NOTES[selectedNoteNodeId];

        const notes = [
            root,
            NOTES[selectedNoteNodeId + 2],
            NOTES[selectedNoteNodeId + 4],
        ];
        pSynth.triggerAttackRelease(notes, "1m");

        MC_CHORDS.next();
    }, VOX_CYCLE_DURATION).start(0);

    Tone.Transport.start();

    Tone.Transport.bpm.value = DEFAULT_SEQUENCE_BPM;
}

(function () {
    init();
})();
