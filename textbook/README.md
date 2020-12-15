# Learn Quantum Computation using Qiskit

Greetings from the Qiskit Community team! This textbook is a university quantum
algorithms/computation course supplement based on Qiskit to help learn:

* The mathematics behind quantum algorithms
* Details about today's non-fault-tolerant quantum devices
* Writing code in Qiskit to implement quantum algorithms on IBM's cloud quantum systems


## Getting Started

Before running the development server, you need to install Node.js and NPM on your computer. Follow
the instructions on the [official page](https://nodejs.org).

After forking and cloning this repository, install all dependencies using `npm install`.

Now you can start a local development server by running `npm start`. Wait for the assets to be
compiled and then open [localhost:5000](http://localhost:5000). The server will automatically watch
for file changes.


## Course Structure

Every course is a subfolder in the [content](content) directory. Every course consists of a few
different components:

* `content.md` contains the source code and metadata for a course. It is written in a [custom
  extension](https://mathigon.io/markdown) of [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
* `functions.ts` contains all course-specific TypeScript code.
* `styles.less` contains all course-specific styles, in [LESS](http://lesscss.org/) format.
* `hints.yaml` (optional) contains any messages that can be sent by Mathigon's
  virtual personal tutor.

The [shared directory](content/shared) contains biographies, glossary and assets used by multiple
courses.

Every course is divided into multiple steps, each with a unique ID. These IDs are used as function
names in `functions.ts` when exporting the setup code for every section. Every function gets called
with a `$step` argument, when the corresponding step is revealed for the first time. Check
[types.d.ts](content/shared/types.d.ts) for the available properties and methods.
