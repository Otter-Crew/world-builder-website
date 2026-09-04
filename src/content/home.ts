export const home = {
  title: 'World Builder',
  hero: {
    eyebrow: 'World Builder for Mac',
    heading: 'Write the book. Build the world.',
    lede: 'A private writing app for novelists and game masters. Draft, organize characters and lore, get editorial feedback, and export a finished book from one folder on your Mac.',
    primary: { label: 'Mac App Store' },
    secondary: { label: 'See how it works', href: '#writing' },
    status: 'Buy once. No subscription. No cloud.',
    figure: {
      src: 'writing-workspace',
      alt: 'World Builder with a manuscript chapter open beside a Context pane showing the world entries mentioned in it.',
      caption: 'The draft and its world, side by side.',
    },
  },
  sections: {
    writing: {
      heading: 'Stop switching between your draft and your notes.',
      beats: [
        {
          title: 'The right context, automatically',
          description:
            'As you write, World Builder shows the characters, locations, and lore in the scene. Their facts and relationships stay one click away.',
          figure: {
            src: 'context-pane',
            alt: 'The Context panel shows world entries mentioned in the current chapter.',
            caption: 'The details for this scene, ready when you need them.',
          },
        },
        {
          title: 'Build a connected world, not a pile of notes',
          description:
            'Link people, places, organizations, and ideas as you write. Then see every connection across your world in one view.',
          figure: {
            src: 'character-context',
            alt: 'The Relationships panel shows connected world entries and the type of each relationship.',
            caption: 'See every connection across your world.',
          },
        },
        {
          title: 'Your history is built in',
          description:
            'World Builder saves revisions as you work. Open any version to see exactly what changed, line by line.',
          figure: {
            src: 'revision-diff',
            alt: 'The History page shows saved revisions and the line-by-line changes in the selected revision.',
            caption: 'Every revision, ready to inspect.',
          },
        },
        {
          title: 'Dictation that knows your world',
          description:
            'Dictate directly into your draft. Speech recognition runs on your Mac and learns the names in your project.',
        },
      ],
    },
    editorial: {
      heading: 'Finish stronger without handing your work to a bot.',
      beats: [
        {
          title: 'Clear feedback while you write',
          description:
            'Catch spelling, grammar, punctuation, repetition, and style issues without leaving the page. Fix them in one click or ignore them.',
          figure: {
            src: 'grammar-suggestion',
            alt: 'The Grammar and Spelling panel shows an issue and a one-click correction.',
            caption: 'Find the issue. Make the call.',
          },
        },
        {
          title: 'Find the problems that need a real pass',
          description:
            'Review a scene, chapter, or whole manuscript for passive voice, sticky sentences, echoes, cliches, pacing, dialogue, point of view, and more.',
          figure: {
            src: 'editorial-overview',
            alt: 'An editorial review overview shows issue counts for dialogue, lexical choices, pacing, point of view, and style.',
            caption: 'A useful editing list, not a generic score.',
          },
        },
        {
          title: 'Your voice stays yours',
          description:
            'World Builder explains what it found and points to the line. It does not replace your prose. You accept, ignore, or rewrite every suggestion.',
          figure: {
            src: 'editorial-report',
            alt: 'A style review shows the checks that found issues and their counts.',
            caption: 'Suggestions, never automatic rewrites.',
          },
        },
      ],
    },
    ownership: {
      heading: 'Your work never leaves your Mac.',
      body: 'Every chapter, character, and world entry is a plain text file in a folder you own. Open it in any editor. Keep it forever. Your project remains usable even if World Builder disappears.',
      privacy:
        'No account. No cloud sync. No analytics. Your manuscript is never uploaded to an AI service. World Builder only connects to fetch the on-device AI or speech models. You can turn off automatic fetching.',
      caption: 'Your files. Your Mac. Your control.',
    },
    machine: {
      heading: 'Local AI gets better. Your AI bill stays at zero.',
      beatTitle: 'Download a model once. Use it forever.',
      body: 'World Builder runs free local models on your Mac, with no credits, per-word charges, or subscription. It recommends one that fits your machine. When a better model arrives, choose it and keep improving your editorial toolkit.',
      figure: {
        src: 'ai-model',
        alt: 'The AI Model settings pane shows model recommendations for this Mac.',
        caption: 'Choose the best model for your Mac.',
      },
    },
    export: {
      heading: 'Export when it is ready to be a book.',
      beat: {
        title: 'Ready to share, print, or publish',
        description:
          'Export PDF for print, EPUB for readers, or HTML for the web. Your book gets a cover, table of contents, and running heads. Make the file yourself and publish wherever you like.',
        figure: {
          src: 'export-complete',
          alt: 'A finished PDF export is listed with options to show it in the file manager or start a new export.',
          caption: 'Export it, then publish it your way.',
        },
      },
    },
    audience: {
      heading: 'For novelists. Great for game masters.',
      body: 'Start with a fantasy novel, science-fiction novel, tabletop campaign, or blank folder. Characters, locations, magic, technology, religions, groups, items, species, and research are ready from the start. Change the structure to fit any genre or world.',
    },
    faq: {
      heading: 'Questions, answered.',
      items: [
        {
          question: 'Do I need an account?',
          answer:
            'No. World Builder is a folder on your Mac, not a service you sign in to.',
        },
        {
          question: 'Does my writing leave my Mac?',
          answer:
            'Never. World Builder only downloads the local AI and speech model files it needs. Automatic downloads are on by default, but you can turn them off and download models yourself.',
        },
        {
          question: 'Will it write my prose for me?',
          answer:
            'No. It finds issues and explains them. You decide every change and write every sentence.',
        },
        {
          question: 'Which checks need a local model?',
          answer:
            'Grammar, spelling, and sixteen rule-based checks work without one. Deeper reads of characters, style, dialogue, point of view, pacing, and lexical choices use a local model.',
        },
        {
          question: 'Can I go back to an old version?',
          answer:
            'You can open any saved revision and see its changes, line by line. A one-click restore is not available yet.',
        },
        {
          question: 'What can I export?',
          answer:
            'PDF, EPUB, or HTML. Export the whole world book or a manuscript on its own.',
        },
        {
          question: 'How will I buy it?',
          answer: 'One purchase on the Mac App Store. No subscription.',
        },
      ],
    },
    store: {
      heading: 'Coming soon to the Mac App Store.',
      body: 'World Builder is in development now.',
    },
  },
  footer: {
    tagline: 'Made by Otter Crew.',
  },
} as const;
