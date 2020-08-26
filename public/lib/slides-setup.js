import {
    bindAudioListener,
    DEFAULT_PLAY_BUTTON_SELECTOR,
} from "./common/audio-context-listener.js";

var BLANK_PAGE_URL = "/blank.html";

export function initRemark() {
    console.log("remark setup");

    bindAudioListener(".remark-slide");

    var slideshow = remark.create({
        sourceUrl: "/slides.md",
        highlightStyle: "monokai",
        touch: false,
    });

    /**
     *
     * Tweaking IFrames to add support for embeddable dataviz
     *
     */

    function killIframes() {
        // Blank out all iframes
        const iframes = document.querySelectorAll("iframe");
        Array.from(iframes).forEach((el) => {
            if (!el.classList.contains("external")) {
                el.src = BLANK_PAGE_URL;
            }
        });
    }

    slideshow.on("showSlide", function (slide) {
        if (!!window.DISABLE_IFRAMES) return;
        const {
            properties = { iframeURL: null, iframeSelector: null },
            properties: { iframeURL, iframeSelector },
        } = slide;

        if (iframeSelector) {
            const el = document.querySelector(iframeSelector);
            if (el) {
                el.src = iframeURL;
            }
        }
        // Slide is the slide being navigated to
    });

    slideshow.on("hideSlide", function (slide) {
        killIframes();
    });

    // Prevent duplicate iframes in presenter + child window mode
    if (window.opener) {
        window.opener.postMessage("mute", window.location.origin);
        console.log("Muting parent window by disabling iframes.");
    }

    window.addEventListener(
        "message",
        (e) => {
            if (e && e.data === "mute") {
                window.DISABLE_IFRAMES = true;
                console.log("Muting window and disabling iframes.");
                killIframes();
            }
        },
        false
    );
}
