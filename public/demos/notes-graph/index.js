import { MarkovChain } from "../../lib/Markov.js";
import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "../../lib/common/audio-context-listener.js";
import { DEFAULT_SEQUENCE_BPM } from "../../lib/common/constants.js";

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

let nodes = null;
let edges = null;
let network = null;
let selectedNodeId = null;

function rand() {
    return NOTES[Math.round(Math.random() * (NOTES.length - 1))];
}

// Graph
const G = {
    0: [0, 0, 2, 4],
    1: [1, 1, 3, 5],
    2: [2, 2, 4, 6],
    3: [4],
    4: [4, 0],
    5: [0],
    6: [1, 0],
};

const MC = new MarkovChain(G, NOTES, 0);

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
    nodes = makeNodes(G, NOTES);

    edges = makeEdges(G);

    // create a network
    const container = document.getElementById("graph");
    const data = {
        nodes: nodes,
        edges: edges,
    };
    const options = {
        nodes: {
            shape: "dot",
            size: 10,
        },
    };

    network = new vis.Network(container, data, options);
}

function init() {
    bindAudioListener(DEFAULT_PLAY_BUTTON_SELECTOR);

    draw();

    network.fit(nodes.map((n) => n.id));

    network.selectNodes([MC.peekID()]);

    let note = null;
    let $el = document.querySelector(".frequency");

    let synth = new Tone.Synth({
        envelope: {
            attack: 0.05,
            attackCurve: "exponential",
            decay: 0.2,
            decayCurve: "exponential",
            release: 0.1,
            releaseCurve: "exponential",
            sustain: 0.2,
        },
    }).toDestination();

    // synth.maxPolyphony = 1;

    const now = Tone.now();
    let t = 0.0;
    const loop = new Tone.Loop((time) => {
        // triggered every eighth note.
        selectedNodeId = MC.nextID();
        network.selectNodes([selectedNodeId]);
        note = NOTES[selectedNodeId];
        synth.triggerAttackRelease(note, "8m");
    }, "4n").start(0);

    Tone.Transport.start();

    Tone.Transport.bpm.value = DEFAULT_SEQUENCE_BPM;
}

(function () {
    init();
})();
