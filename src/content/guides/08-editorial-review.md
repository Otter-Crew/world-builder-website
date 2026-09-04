---
title: Editorial review
description: Run sixteen rule-based checks and six model reads across a chapter or a manuscript, then accept or decline what it finds.
order: 8
outcome: You can run an editorial review at whatever scope fits, read its report, and act on each suggestion one at a time.
hero: ../../assets/screens/editorial-overview.png
heroAlt: The editorial review Overview screen, with one card per analyzer, Dialogue with 3 notes, Lexical with 6 notes, Pacing with 2 notes, POV with 2 notes, and Style with 35 notes.
heroCaption: Each card in an editorial review's overview is one analyzer's report; open one to read its findings.
sources:
  - e2e/specs/36
  - e2e/specs/37
  - crates/tauri-backend/src/services/editorial/
  - apply_review_hunk command
  - reject_review_hunk command
---

## Chapter, manuscript, or part

Start an editorial review from a chapter, from a whole manuscript, or from a single world part, and the analysis runs at that scope only. A single chapter's review reads fast; a whole manuscript's review is the same checks run across every chapter in it, gathered into one report.

## The sixteen rule and count checks

Most of what a review finds comes from sixteen checks that count and measure rather than guess: overused words, sentence length against a guidance band, the share of "sticky" sentences glued together with filler words, passive voice, readability scores like Flesch-Kincaid and SMOG, dialogue tags, and more. Each one reports a number and, where it makes sense, the threshold it was measured against.

## The six model reads

Alongside the counting checks, six others read the chapter the way a person would, using the model running on your machine rather than a fixed rule, the kind of judgment call a spreadsheet cannot make on its own, like whether the point of view actually drifts partway through a scene.

## Reading a report

The overview is one card per analyzer, Dialogue, Lexical, Pacing, POV, Style, and the rest, each showing how many notes it has and a one-line summary. Open a card and it expands into the full detail behind that summary: the actual numbers, the guidance band they were measured against, and which sentences triggered a flag.

## Accept change and Decline

Where a check suggests an actual rewrite rather than just pointing something out, you get two buttons on it: Accept applies the change to your chapter, Decline leaves your words untouched and moves to the next suggestion. Nothing is applied to your manuscript until you say so.

See [Reviews](/learn/reviews/) for what happens to a review after you close it, and [Grammar and spelling](/learn/grammar-and-spelling/) for the lighter pass that runs as you type instead of on demand.
