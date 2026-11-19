# Project engineering notes

These notes connect the profile to the public implementation and its trade-offs. Source was inspected on **19 November 2026**. They describe design decisions and documented boundaries, not a new claim that every runtime or device check passed.

## KeyTurn: deterministic review and browser state

The study loop combines reading, typing, recall and targeted review. A small deterministic scoring rule makes a weak-word selection explainable: mistyped keys, corrections and long pauses contribute to the score, with a concept fallback after a missed recall answer. Browser-local progress avoids an account service, but storage can be cleared and does not synchronize across devices.

[Scoring rule and source map](https://github.com/SHUBHRAGHAVT-57/bookdesign#how-echo-review-picks-a-word) · [Impact hypothesis and proposed evaluation](https://github.com/SHUBHRAGHAVT-57/bookdesign/blob/main/docs/IMPACT.md)

The repository history also includes collaborator contributions. Maintainer ownership does not imply that every line was written independently; retain contribution history and notices when reusing source.

## Lensqivo: preserve the capture before refining its appearance

CameraX owns the capture pipeline. Recording remains owned until finalization, and native photo originals remain available until publication succeeds. The application shares an SDR effects path across preview/video and still processing; tiled export bounds part of the GPU workload. Shared code is an architectural choice, not proof of color or framing parity on physical cameras.

[Capture and export architecture](https://github.com/SHUBHRAGHAVT-57/Lensqivo#under-the-viewfinder) · [Research and trade-offs](https://github.com/SHUBHRAGHAVT-57/Lensqivo/blob/main/docs/research.md) · [Device qualification gates](https://github.com/SHUBHRAGHAVT-57/Lensqivo/blob/main/docs/validation.md)

## SyncVerse: distinguish a local save from delivery to a peer

Yjs supplies mergeable document updates; its CodeMirror binding connects those updates to the editor. IndexedDB stores local document state, while the WebSocket relay distributes updates between browsers and persists relay state. These are separate responsibilities: a local edit can exist before another browser receives it. A random document URL does not enforce permission.

[Architecture](https://github.com/SHUBHRAGHAVT-57/syncverse/blob/main/docs/ARCHITECTURE.md) · [Security model and deployment boundaries](https://github.com/SHUBHRAGHAVT-57/syncverse/blob/main/docs/SECURITY.md) · [Two-browser evaluation](https://github.com/SHUBHRAGHAVT-57/syncverse#run-locally)

## For You: keep the gift readable without graphics

The gift payload is validated and encoded in a URL fragment, with Unicode-safe limits. HTML carries names, notes and controls; the canvas is decorative. Reduced motion and static SVG fallbacks preserve the recipient experience when animation or WebGL is unavailable. Putting the note in a share link removes the need for a database, but the full link is readable by anyone who has it and cannot be centrally revoked.

[Sharing model and privacy](https://github.com/SHUBHRAGHAVT-57/Gift-for-Soemeone#create-a-gift) · [Accessibility and rendering lifecycle](https://github.com/SHUBHRAGHAVT-57/Gift-for-Soemeone#accessibility-and-rendering)

## Algorithmic Lab: contracts before breadth

Each reference implementation states its result, input assumptions and complexity, with tests for edge cases. Lower bound assumes ascending input; maximum subarray requires a nonempty input; BFS measures hops in an unweighted graph. A reference implementation is not evidence of an independently solved or accepted contest submission.

[Implementation contracts](https://github.com/SHUBHRAGHAVT-57/algorithmic-lab#implemented-algorithms) · [Tests and contribution expectations](https://github.com/SHUBHRAGHAVT-57/algorithmic-lab#contributing)

## Evidence and scope

Project READMEs, tests and dated verification records are the authority for current behavior. CI checks, emulator output, headless browser checks, physical-device measurements and human usability evidence answer different questions. No learning gain, production-load result, hardware result or user count is claimed here.

Profile artwork and automation provenance are documented in [the profile guide](profile-guide.md) and [third-party notices](../THIRD_PARTY_NOTICES.md).
