# Making Music With Code

![robot](https://vignette.wikia.nocookie.net/chrono-trigger/images/1/12/Gato_chrono_trigger-0.png/revision/latest/scale-to-width-down/340?cb=20161214172804&path-prefix=es)

## Description

This repo services two purposes:

1. It contains all the slides from a talk called "Making Music With Code" (originally presented on 8/27/2020).
2. It brings together a couple of tech demos of data viz + experiments with WebAudio API into a single place.

## Overview

The code in this repo is intentionally designed to require as few frameworks & build scripts as possible. It's mostly vanilla JS, CSS, HTML. However, it relies heavily on ES6 modules to accomplish this and it may not work without a relatively new browser. The latest version of Chrome on a Desktop machine is recommended.

### Files

```
├── assets       # <---- static assets like images, sample wav files, etc
│   ├── img
│   │   ├── ...
│   └── samples
│       ├── ...
├── blank.html   # <---- for 404s, loading states, etc.
├── demos        # <---- the code for each embedded widget
│   ├── 808  # <-- 808 drum machine demo
│   │   ├── index.html
│   │   └── index.js
│   ├── beats-graph # <-- beats markov chain graph
│   │   ├── index.html
│   │   └── index.js
│   ├── chords-graph # <-- chords markov chain graph
│   │   ├── index.html
│   │   └── index.js
│   ├── drake-graph # <-- drake markov chain graph
│   │   ├── index.html
│   │   └── index.js
│   ├── notes-graph # <-- notes markov chain graph
│   │   ├── index.html
│   │   └── index.js
│   ├── play-button # <-- stand-alone play button div
│   │   └── index.html
│   ├── random-tones  # <--- random tones display
│   │   ├── index.html
│   │   ├── index.js
│   │   └── styles.css
│   └── scale-tones   # <--- scale tones display
│       ├── index.html
│       └── index.js
├── index.html
├── index.js
├── lib            # <-- shared js, css files
│   ├── common
│   │   ├── ...
│   ├── matrix-16x8  # <--- stuff from the old matrix visualization
│   │   ├── ...
│   ├── slides-setup.js # <-- remark.js extensions and boilerplate
│   └── sqcr-demo    # <--- stuff from the old sqcr demo
│       ├── ...
├── slides.md      # <-- slides content for remark.js
└── styles.css     # <-- primary stylesheet
```
