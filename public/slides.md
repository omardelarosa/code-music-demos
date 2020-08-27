class: center, middle
iframeURL: /demos/808/index.html
iframeSelector: .frame-808-1

# Making Music With Code

![](https://vignette.wikia.nocookie.net/chrono-trigger/images/1/12/Gato_chrono_trigger-0.png/revision/latest/scale-to-width-down/340?cb=20161214172804&path-prefix=es)

<iframe src="/blank.html" width="0" height="0" class="frame-808-1" frameborder="0"></iframe>

???
Sound check. Reset clock before starting.

---

class: center, middle

# What is This?

---

class: top, left

# What is This?

--

- An overview of **algorithmic composition** with hints of AI/ML

--
- Focusing on **AOT** (*Ahead of Time*) style
    - A type of process-music where sequences and sounds are generated using computer programs (aka code)
    - written in advance
    - coding is not part of the performance
--

- Not on **Live** style
    - <img src="https://www.vectorform.com/wp-content/uploads/2016/10/algorave-detroit_thumb-1024x600.jpg" width="150px" />
    - Coding is part of the performance
    - See also:
        - [SuperCollider](https://supercollider.github.io/)
        - [SonicPi](https://sonic-pi.net/)
        - [TidalCycles](https://tidalcycles.org/index.php/Welcome)

---

class: top, left

# What is This?

- Slides are available on Github as Markdown.

--

- Examples written in JavaScript and Python

    - <img src="https://cxl.com/wp-content/uploads/2019/09/image3.png" width=200 />


---

class: center, middle

# Who Am I?

---

# Who Am I?

--

-   I'm **[omar delarosa](https://omardelarosa.com)**. 👋

--

-   I'm a Tech Lead on the Search Data Science Team at Grubhub. 🍕🌮

--

-   I play music in my spare time. 🎸 🎹

--

-   I took some music theory courses in college. 🤷‍♂️

--

-   I put music on [SoundCloud](https://soundcloud.com/ioximusic) and [YouTube](https://www.youtube.com/omardelarosa) sometimes.

---

class: center, middle

# Why This?

---
class: left, top

# Why This?

--

- Lots of people know how to write code. 💻

--

- Lots of people play music. 🎸

--

- So why not do both at once? 🤝

--

- Here are some ideas 🤔

---

class: left, top

# Agenda

- Basics 👶

--

    - Music Theory 🎶

--
    - Music Graphs 🕸

--
    - Markov Chains ⛓

--

- Advanced 👴

--

    - Vectorizing Music ♾

--
    - Machine Learning and Music 🤖

---

class: center, middle

# What is Music? 🤔

---

class: center, middle

## Sound Waves

<img src="https://images.vexels.com/media/users/3/145868/isolated/preview/395e11dc92884b535d825403bc12cb04-sound-wave-sharp-by-vexels.png" width=400 />

---

class: center, middle

### Individual Frequencies Are Perceived as Tones

---

class: center, middle
iframeURL: /demos/random-tones/index.html
iframeSelector: .random-tones-frame

### Random Tone Frequencies

<iframe class="random-tones-frame" width="100%" src="/blank.html" frameborder=0></iframe>

---

class: left, top

### Special Frequencies

--

- Frequences like `440hz` are named **notes** such as `A4` [(more info)](https://pages.mtu.edu/~suits/notefreqs.html)

--

- Exact tunings can vary by instrument and styles

--
    - See also:
        - [*equal temperment*](https://en.wikipedia.org/wiki/Equal_temperament)
        - [*microtonal music*](https://en.wikipedia.org/wiki/Microtonal_music)

--

- Definitions:
    - a **note** is named tone <img src="https://i.imgur.com/Oq5SzEq.png" width=300 />
    - a **scale** is ordered set of notes <img src="https://i.imgur.com/mu2XHAd.png" width=300 />

---

class: center, middle

iframeURL: /demos/scale-tones/index.html
iframeSelector: .scale-tones-frame

### Random Named Notes from the Same Scale

<iframe class="scale-tones-frame" width="100%" src="/blank.html" frameborder=0></iframe>

---

class: center, middle

### Harmony

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Harmonic_partials_on_strings.svg/250px-Harmonic_partials_on_strings.svg.png" width=400 />

---

class: left, top

## Harmony

--

- Relationships between sound waves

--

- Often occurs when multiple waves oscillate at whole number ratios with each other

- Definitions:

--
    -   **melody** - a sequence of tones over time
        - <img src="https://i.imgur.com/EJZeByT.png" width=300 />
    -   **chord** - tones at the same time, named after the component **notes**
        - <img src="https://camo.githubusercontent.com/9dacb4e285e739eccd0a67894cd812bc070651b9/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3234313239392f323436313335352f30333631626165652d616637362d313165332d396665342d3535663734356532646230362e706e67" width=200 />
    - **chord progression** - a sequence of chords over time:
        - <img src="https://i.imgur.com/QRjNIda.png" width=300 />

---
class: center, top
iframeURL: /demos/808/index.html
iframeSelector: .frame-808

### Rhythm

<iframe src="/blank.html" width="100%" height="100%" class="frame-808" frameborder="0"></iframe>

---

### Rhythm

-   **duration** - how long a tone lasts

-   **beat** - a single unit of rhythm <img src="https://i.imgur.com/cpjlCGz.png" width=50 />

-   **measure** - a regularly spaced group of beats <img src="https://i.imgur.com/Ow5xhm0.png" width=300 />



---

### Rhythm & Fractions

-   Durations are all described as fractions of a **measure**

--

-   **1/4** Note <img src="https://i.imgur.com/ChUoGvo.png" width=200 />

--

-   **1/8** Note <img src="https://i.imgur.com/E5SC08v.png" width=200 />

--

-   **1/16** Note <img src="https://i.imgur.com/ALcpf8n.png" width=200 />

---

### Fun With Fractions

-   Not all are multiples of 2.

--

-   Some interesting things happen when you mix up durations where the denominator of the fraction is a multiple of 3.

<img src="https://i.imgur.com/OuujOEg.png" width=300 />

--

-   This is common in generes such as hip hop.


---
class: center, middle

## Harmony & Rhythm = Pitch & Time

<img src="/assets/img/pianoroll_01.png" width=400 />

*Chopin's **Etudes, Opus 10, No.1** as a pianoroll plot*

<iframe class="external" width="300" src="https://www.youtube.com/embed/JRgQgr4-at8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

class: center, middle

# Graphs

<img src="/assets/img/graph-example.png" width=300 />


---

class: center, middle

### Music & Graphs

Music sequences can be thought of as directed walks along the **edges** of a graph where each discrete\* **state** is a node.

<img src="/assets/img/3_state_piano.svg" width=600 />

Each **state** (*Sn*) can be a single note or a beat or any music element in a sequence of musical events.

<br />

<br />

<span style="font-size: 0.55em; font-style: italic">*Assume each state in music is discrete.  Further discussions of microtonality and certain continuous musical spaces are out of scope in this section.</span>

---

class: center, middle

### Music & Finite State Machines

<img src="/assets/img/fnm_01.png" width=400 />

The entire action space of a sequence of music can thus be described using a **finite state machine**.

---

class: center, middle

# Markov Chain

The most straightforward way to produce **algorithmic compositions**.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Markovkate_01.svg/220px-Markovkate_01.svg.png)

_"a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event"_

[from Wikipedia](https://en.wikipedia.org/wiki/Markov_chain)

---
class: center, middle

# Markov

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/AAMarkov.jpg/220px-AAMarkov.jpg" width=200 />

*Andrey Markov, namesake of Markov chains and more.*

---

class: center, top
iframeURL: /demos/notes-graph/index.html
iframeSelector: .scale-tones-graph-frame2

#### Note Markov Chain

<iframe class="scale-tones-graph-frame2" width="100%" height="70%" src="/blank.html" frameborder=0></iframe>

???
Avoid talking over synths

---

class: center, top
iframeURL: /demos/chords-graph/index.html
iframeSelector: .scale-chords-graph-frame

#### Chord Markov Chain

<iframe class="scale-chords-graph-frame" width="100%" height="70%" src="/blank.html" frameborder=0></iframe>

???
Avoid talking over synths

---

class: center, top
iframeURL: /demos/beats-graph/index.html
iframeSelector: .beats-graph-frame

#### Beat Markov Chain

<iframe class="beats-graph-frame" width="100%" height="70%" src="/blank.html" frameborder=0></iframe>

---

class: center, top
iframeURL: /demos/drake-graph/index.html
iframeSelector: .drake-graph-frame

#### Drake Markov Chain

<iframe class="drake-graph-frame" width="100%" height="70%" src="/blank.html" frameborder=0></iframe>

---

### Markov Chains (With Benefits)

--

-   Markov chain transition matrices can be learned from a corpus text (or a MIDI file)

--

-   Data can be represented and stored easily as structured data formats such as JSON

--

-   Can extend to more complex, multi-state transition matrices, but this is outside the scope of this prez.



---

class: middle, center

# Music & Code

<img src="/assets/img/ghost_in_the_shell_fingers.gif" width=400 />

---

### Rhythm as Code

#### Beat Grids

![](https://i.stack.imgur.com/DTE8c.png)

-   Centered around 1/16th note ticks

-   Can be difficult to "escape the grid" with durations < 1/16.

-   Also tough to use subdivisions that are multiples of 3.

---

# Rhythm and Computation

#### Beat Grids as Code

```javascript
// 16-element arrays can represent rhythm patterns, but are tough to read.
const kicks   = [1,0,1,0,  0,0,1,0,  0,0,1,0,  0,0,1,0];
const snares  = [0,0,0,0,  1,0,0,0,  0,0,0,0,  1,0,0,0];
const hats    = [1,1,1,1,  1,1,1,1,  1,1,1,1,  1,1,1,1];
const cowbell = [0,0,0,0,  0,0,0,0,  0,0,0,0,  1,0,1,0];
```

---

# Rhythm Notation

#### Beat Grids as "Words"

```javascript
// Easier to read, CPU-trivial preprocessing
const kicks   = fmt('1010 0010 0010 0010');
const snares  = fmt('0000 1000 0000 1000');
const hats    = fmt('1111 1111 1111 1111');
const cowbell = fmt('0000 0000 0000 01010');
```

---

# Rhythm Notation

#### Beat Grids as Lists of Words (a Language?)

```javascript
// A list of patterns
const kick_patterns = [
    fmt("1010 0010 0010 0010"),
    fmt("1001 0001 0101 0010"),
    fmt("1000 0101 0100 0010"),
    fmt("1000 0010 0000 0100"),
];
```

---

## Generative Beats

#### We could make two pattern sets

```javascript
const kick_patterns = [
    fmt("1010 0010 0010 0010"),
    fmt("1001 0001 0101 0010"),
    fmt("1000 0101 0100 0010"),
    fmt("1000 0010 0000 0100"),
];

const snare_patterns = [
    fmt("0000 1000 0000 1000"),
    fmt("0010 1000 0000 1010"),
    fmt("0000 1000 0010 1000"),
];
```

---

## Generative Beats

#### And randomly combine them

```javascript
const kicks_sequence = [
    ..._.sample(kick_patterns),
    ..._.sample(kick_patterns),
    ..._.sample(kick_patterns),
    ..._.sample(kick_patterns),
];

const snare_sequence = [
    ..._.sample(snare_patterns),
    ..._.sample(snare_patterns),
    ..._.sample(snare_patterns),
    ..._.sample(snare_patterns),
];

playParallel(kicks_sequence, snare_sequence);
```

### Simple Markov Chain Implementation

```javascript
class MarkovChain {
    constructor(obj = {}, states = [], initialState = 0) {
        this.graph = { ...obj };
        this.states = [...states];
        this.currentState = initialState;
    }

    set() {
        const newState = this.sample(this.graph[this.currentState]);
        this.currentState = newState;
    }

    next() {
        this.set();
        return this.states[this.currentState];
    }

    sample(list) {
        return list[Math.floor(list.length * Math.random())];
    }
}
```

---

## Markov Chain of Notes

-   Using an adjacency list instead of matrix (for readability, simplicity)

```javascript
const NOTES = ["C", "D", "E", "F", "G", "A", "B"];

const G = {
    // Repeated notes represent higher probabilities
    0: [1, 1, 0, 3, 4, 5, 6], // 0 -> 1 is 2/7, the rest 1/7
    1: [0, 0, 2, 3], // 1 -> 0 is 1/2 the others 1/4
    2: [1, 3, 4],
    3: [4], // 3 -> 4 means state 4 always follows 3 or 1/1 probability
    4: [5],
    5: [5, 4, 1, 0],
    6: [2, 2, 2, 3, 3],
};

const mc = new MarkovChain(G, NOTES);
```

---

## Markov Chain of Chords

```javascript
const CHORDS = ["C maj", "D min", "E min", "F maj", "G maj", "A min", "B dim"];

// Favors I <-> IV, V -> I cadences
const G = {
    0: [3, 3, 3, 5],
    1: [2, 5],
    2: [3],
    3: [4, 4, 4, 1, 1],
    4: [0, 0, 0, 5],
    5: [1, 6],
    6: [4],
};

const mc = new MarkovChain(G, CHORDS);
```

---

## Markov Chain of Rhythm Patterns

```javascript

// Tuples of duration & number of beats
const HATS = [
    [16, 4],
    [12, 3],
    [24, 6],
    [32, 4],
    [48, 6],
    [64, 8],
];

// Favors steady 1/16 notes -- common in hip hop
const G = {
    0: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4], // 0 -> 0 has 3/5 odds
    1: [0, 0, 0, 3],
    2: [0, 0, 0, 3],
    3: [2, 5],
    4: [2, 3, 4, 1],
    5: [3, 2, 4, 2, 2],
};
```

---

# And So...

-   Music is a graph.

--
-   Music sequences are walks along the edges of those graphs.

--

-   Markov chains are cool.

---

class: center, middle

# Advanced Topics

<img src="https://media.giphy.com/media/5D6pAHiFdAAww/giphy.gif" width=400>

---
class: center, middle

## Remember Pitch & Time?

<img src="/assets/img/pianoroll_01.png" width=400 />

*Chopin's **Etudes, Opus 10, No.1** as a pianoroll plot*

<iframe class="external" width="300" src="https://www.youtube.com/embed/JRgQgr4-at8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

class: center, top

## Let's Turn That on Its Side

<br />
<img src="/assets/img/pianoroll_01.png" width=400 style="transform: rotate(90deg);" />

---

class: center, middle

# Discrete Note Spaces

---

class: center, middle

## 1-D Row Vector Note States

<img src="/assets/img/PianoToVector1.svg" width=450 />

---

class: center, middle

## Stacked Row Vectors

Let *s* = a given state, *t* = a point in time and *i* = a note in some scale.

<img src="/assets/img/vector_01.png" width=450 />

⬇

<img src="/assets/img/vector_02.png" width=450 />

2-D Matrices Representing *Pitch* (Columns) and *Time* (Rows)

---

class: center, middle

# Now Let's Get Creative

<img src="https://media.giphy.com/media/PY8wElng9cygE/giphy.gif" width=400 />

---

class: center, middle

# Hypercube Music

<img src="/assets/img/hypercube_00.gif" width=400 />

---

class: center, middle

# Walking a Hypercube Graph

<img src="/assets/img/hypercube_walk.png" width=500 />

When scaled up to an 8-D hypercube this can easily represent any diatonic scale such as C Major or B minor.

---

# Hypercube Music Example

And arpeggiator sequence of nearest neighbor "chord nodes" on an 8-D hypercube:

<iframe class="external" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/882546211%3Fsecret_token%3Ds-VEWClRbOIUF&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ioximusic" title="ioxi" target="_blank" style="color: #cccccc; text-decoration: none;">ioxi</a> · <a href="https://soundcloud.com/ioximusic/hypercube-arpeggiator-loops/s-VEWClRbOIUF" title="Hypercube Arpeggiator Loops" target="_blank" style="color: #cccccc; text-decoration: none;">Hypercube Arpeggiator Loops</a></div>


---

class: center, middle

# Cellular Automata Music

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif" width=300 />

---
class: center, top

# Cellular Automata Music

Generate row vectors using CA update rules:

<img src="/assets/img/1D_CA.svg" width=600 />

<br/>

Stack them to form music state matrices:

<img src="https://plus.maths.org/content/sites/plus.maths.org/files/articles/2019/budd/rule_90.png" width=350 />


---

class: center, top

# Cellular Automata Music

Sample notes from the state matrices to make melodies or chords:

<img src="https://github.com/omardelarosa/tendril/raw/master/docs/tendril.gif" width=450 />

---

class: center, top

# Cellular Automata Music

Example 1: CA Piano

<img src="/assets/img/pianoroll_02.png" width=300 />

<iframe class="external" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/767229769%3Fsecret_token%3Ds-htqttgkY8Ty&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ioximusic" title="ioxi" target="_blank" style="color: #cccccc; text-decoration: none;">ioxi</a> · <a href="https://soundcloud.com/ioximusic/tendrill-in-c-minor/s-htqttgkY8Ty" title="Tendril (in C Minor)" target="_blank" style="color: #cccccc; text-decoration: none;">Tendril (in C Minor)</a></div>

[code](https://github.com/omardelarosa/tendril)

---

class: center, top

# Cellular Automata Music

(see [Wolfram Tones](https://tones.wolfram.com/generate/G7sEXbFOGuTIaHlZsyuwxUnoShs8PRKuzIgYMm3YpzqpXiEc) for more elaborate examples)

<a href="https://tones.wolfram.com/generate/G7sEXbFOGuTIaHlZsyuwxUnoShs8PRKuzIgYMm3YpzqpXiEc" />
    <img src="/assets/img/wolfram_tones.png" width=400 />
</a>

---

class: center, middle

# Machine Learning Music

<img src="https://vignette.wikia.nocookie.net/chrono-trigger/images/1/12/Gato_chrono_trigger-0.png/revision/latest/scale-to-width-down/340?cb=20161214172804&path-prefix=es" width=300 />

---

iframeURL: /public/sqcr-demo/html/matrix-16x8.html
iframeSelector: .matrix-16x8

### Thanks

<iframe class="matrix-16x8" width="560" height="315" src="/blank.html" frameborder="0"></iframe>

-   [Tone.js - full features JS code library](https://tonejs.github.io/)
-   [vis.js - dataviz library](http://visjs.org/)
-   [Yotam Mann](https://yotammann.info/)
-   [Chris Wilson - "A Tale of Two Clocks"](https://www.html5rocks.com/en/tutorials/audio/scheduling/#toc-usingsettimeout)
-   [Andrew Sorensen - "The Concert Programmer"](https://www.youtube.com/watch?v=yY1FSsUV-8c)
-   [Sam Aaron - "Programming as Performance"](https://www.youtube.com/watch?v=TK1mBqKvIyU)

---

class: center, top

## Slides:

### [markov-music.now.sh](https://markov-music.now.sh)

## Slides Code:

### [github.com/omardelarosa/markov-music-js](github.com/omardelarosa/markov-music-js)
