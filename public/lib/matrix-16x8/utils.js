import { MarkovChain } from "../Markov.js";

export const MC_LEVELS = new MarkovChain(
    {
        1: [1, 1, 1, 0, 0],
        0: [0, 0, 1, 1, 1],
    },
    [1, 0],
    1
);
