---
title: Context while you write
description: The panel beside your prose finds the character sheets and place notes that matter for the page you have open. No asking, no prompting.
order: 6
outcome: You know why a card appears in the Context pane, and how to tune what it surfaces for your project.
hero: ../../assets/screens/context-pane.png
heroAlt: The Context pane, showing two cards, The Resonance, a Magic part, and Aria Voss, a Characters part, each with a heading from its own file and a line of text.
heroCaption: The Context pane surfaces the parts relevant to the page you have open, not your whole world at once.
sources:
  - crates/tauri-backend/src/services/context/
  - src/components/project/ContextSettingsTab.tsx
---

## What the pane shows

The Context pane sits at the top of the right dock. As you write, it fills with cards, one per world part, pulled from the sections of that part's own file that seem relevant: a magic system's "How It Works", a character's "Backstory". You do not go looking for these; the pane decides what belongs there and keeps it current as you keep typing.

## The four signals (names in prose, @ links, recent edits, files that change together)

Four things push a part toward the top of the pane. A character's name appearing in the prose you are writing is one. An `@` link to a part is a stronger one, you told World Builder directly that this part matters here. Parts you edited recently count too, on the theory that what you touched last is still on your mind. And the pane looks at git history: parts whose files have historically changed together with the one you have open are surfaced even without a name or a link, because that pattern has meant something before.

## Tuning weights and decay in Settings

None of the four signals is fixed. Open Settings and find the context page, and you can adjust how much weight each signal carries, how quickly an old edit or an old mention decays out of relevance, and how many cards the pane shows at once. A heavily cross-referenced project might want more cards and a slower decay; a fast first draft might want fewer, weighted toward whatever you just linked.

See [Linking prose to your world](/learn/linking-prose-to-your-world/) for the `@` links that are one of the four signals, and [Relationships and the graph](/learn/relationships-and-the-graph/) for another way the same parts connect.
