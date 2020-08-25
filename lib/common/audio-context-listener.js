/*

This is a solution to the audio context limitations on newer chrome.

*/

export const DEFAULT_PLAY_BUTTON_SELECTOR = ".play-button";

export function bindAudioListener(selector) {
    if (Tone.context.state !== "running") {
        Tone.context.resume();
    }

    document.querySelector(selector).addEventListener("mousedown", function () {
        if (Tone.context.state !== "running") {
            Tone.context.resume();
        }
    });
}
