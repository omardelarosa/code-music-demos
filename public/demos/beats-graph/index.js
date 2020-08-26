import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";
import { createInstruments } from "../../lib/sqcr-demo/instruments.js";
import { NOTE_HAT, hats, MC_HATS, _sample } from "../../lib/sqcr-demo/utils.js";
import { DEFAULT_SEQUENCE_BPM } from "../../lib/common/constants.js";

const HATS_STR = hats.map((a) => `1/${a[0]} note`);
const G = {
    0: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4],
    1: [0, 0, 0, 3],
    2: [0, 0, 0, 3],
    3: [2, 5],
    4: [2, 3, 4, 1],
    5: [3, 2, 4, 2, 2],
};

let nodes = null;
let edges = null;
let network = null;

const instruments = createInstruments();

// create an array with nodes
function makeNodes(obj, labels) {
    var nodeStyle = {
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
    };
    const ids = Object.keys(obj).map(Number);
    return ids.map((id) => {
        return {
            id,
            value: obj[id].length, // how many edges
            label: labels[id],
            ...nodeStyle,
        };
    });
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
    nodes = makeNodes(G, HATS_STR);

    edges = makeEdges(G);

    // create a network
    var container = document.getElementById("graph");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        nodes: {
            shape: "dot",
            size: 10,
        },
    };
    network = new vis.Network(container, data, options);
}

draw();

network.fit(nodes.map((n) => n.id));

network.selectNodes([MC_HATS.peekID()]);

const loop_hats = new Tone.Loop((time) => {
    // Hi-hats
    let nid = MC_HATS.peekID();
    network.selectNodes([nid]);
    let hats_pattern = hats[nid];
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

Tone.Transport.bpm.value = DEFAULT_SEQUENCE_BPM;

bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);
