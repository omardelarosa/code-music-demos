import { MarkovChain } from "../Markov.js";

// setTempo(60);
// sqcr.stop();

// Global pulse counter
let M = 1.0;
let pulse = 0;

// Format pattern shorthand
export const fmt = (s) => s.replace(/\s/g, "").split("").map(Number);
// Random element from arr
export const _sample = (arr) => arr[parseInt(Math.random() * arr.length)];

// Utility for generating infinite counters
export const nextOf = (max) => {
    let i = 0;
    return () => {
        return ++i % max;
    };
};

export const beatFromTick = (t) => Math.floor(t % 16);
export const tickToMS = (t) => SQCR.Transport.cl;
export const expectedMS = (ticks) => sqcr.tickToMS() * ticks;

export const next4 = nextOf(4);

export const kicks = [
    fmt("4040 0000 0040 0040"),
    fmt("4000 0040 0040 0000"),
    // fmt('4020 0000 4000 0000'),
    // fmt('4020 0010 4020 0020'),
    // fmt('4030 0020 4020 1000')
];

export const hats = [
    [16, 4],
    [16, 4],
    [12, 3],
    [24, 6],
    [32, 8],
    [48, 12],
    [64, 16],
];

// Create markov chain for hats
export const MC_HATS = new MarkovChain(
    {
        0: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4],
        1: [0, 0, 0, 3],
        2: [0, 0, 0, 3],
        3: [2, 5],
        4: [2, 3, 4, 1],
        5: [3, 2, 4, 2, 2],
    },
    hats,
    0
);

// Keeps track of hi-hat hits (or tick substate)
let h_counter = 0;

export const snares = [
    fmt("0000 4000 0000 4000"),
    // fmt('0100 4000'),
    // fmt('1000 4000'),
    // fmt('0100 4100'),
    // fmt('0001 3011'),
];

export const LETTERS = "ABCDEFG";

export const KEY = ["F4", "major"];

export const makeScale = (note) => {
    console.log("Tonal: ", Tonal);
    debugger;
    // Tonal.Scale(KEY[1]).map(Tonal.transpose(note));
};

export const noteParse = (note) => {
    const parts = note.split("");
    let letter;
    let isSharp = false;
    let oct = 0;
    // Has flat
    if (parts.length === 3) {
        let idx = LETTERS.indexOf(parts[0]);
        if (idx === -1) throw new Error("Invalid note: " + note);
        else if (idx === 0) {
            idx = LETTERS.length - 1;
        } else {
            idx = idx - 1;
        }
        letter = LETTERS[idx];
        isSharp = true;
        oct = parseInt(parts[2]);
    } else {
        letter = parts[0];
        oct = parseInt(parts[1]);
    }
    return {
        note: letter + (isSharp ? "#" : ""),
        oct,
    };
};

// Make an array of notes
// export const scale = [
//     ...makeScale("F3"),
//     ...makeScale("F4"),
//     ...makeScale("F5"),
//     ...makeScale("F6"),
// ];
export const chords = [0, 3, 4, 3, 2];
export const chord = 0;
export const notes = [0, 2, 4, 6];

// Get MIDI outputs
export const NOTE_KICK = "A0";
export const NOTE_SNARE = "A1";
export const NOTE_HAT = "A2";
export const NOTE_CLAP = "B1";

export const DRAKE = ["C2", "D2", "E2", "F2", "G2"];
export const THUG = ["C3", "D3", "E4"];

export const playInst = (inst, note, dur = 50) => {
    let timer;
    try {
        inst.triggerAttack(note);
        timer = setTimeout(() => {
            inst.triggerRelease(note);
        }, dur);
    } catch (e) {
        clearTimeout(timer);
        console.log("Instrument error!", e.message);
    }
};
