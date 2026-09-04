# Shot list

Everything except dictation comes from `pnpm run capture`. Dictation is
captured by hand on the Mac:

1. Open the fantasy template project, chapter `ch-01-the-descent`.
2. Settings, Dictation: download the model once; pick the built-in mic.
3. Press Cmd+Shift+D. Say: "Kyralen waited at the gate." Stop.
4. With the transcript line visible in the Dictation section of the right
   dock, take a screenshot of that section only
   (`screencapture -i -x src/assets/screens/dictation.png`, drag the section).
5. `sips -g pixelWidth src/assets/screens/dictation.png` should print at
   least 560.
6. Wire it in. Four edits, all of them currently absent on purpose:
   - `src/pages/index.astro`: restore the
     `import dictation from '../assets/screens/dictation.png'` line and the
     `'dictation': dictation` entry in `shots`.
   - `src/content/home.ts`: add the `figure` block back to the dictation beat
     (`sections.writing.beats[3]`) with `src: 'dictation'`, an `alt`
     describing the Dictation section with the transcript line in it, and
     `caption: 'Same recording, with the project\u2019s names loaded. Kyralen is Kyralen.'`.
   - `e2e/site.spec.ts`: add `sections.writing.beats[3].figure` to
     `figureContracts`, in beat order, and drop the comment above it saying the
     dictation beat ships text-only.
