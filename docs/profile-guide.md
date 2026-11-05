# Profile guide

## Public project scope

The profile was refreshed on **5 November 2026** against the connected GitHub repository source. It presents four public projects and the public profile repository. Private repository names, code, demo accounts and implementation details are excluded from the public profile.

| Project | Evidence used for the README |
| --- | --- |
| [KeyTurn / bookdesign](https://github.com/SHUBHRAGHAVT-57/bookdesign) | React/TypeScript/Vite source, localStorage state, deterministic recall/review scoring, service worker, Vitest and Playwright configuration |
| [Lensqivo](https://github.com/SHUBHRAGHAVT-57/Lensqivo) | Kotlin/Compose application, CameraX photo/video paths, Media3 effects, Java core and Android quality workflow; physical-device qualification remains pending |
| [SyncVerse](https://github.com/SHUBHRAGHAVT-57/syncverse) | Yjs/CodeMirror editor, IndexedDB persistence, local WebSocket relay, Markdown preview/export and test configuration; production authentication and access control are absent |
| [Algorithmic Lab](https://github.com/SHUBHRAGHAVT-57/algorithmic-lab) | Four Python algorithm implementations, documented contracts, unittest cases and Python CI |

Project features describe inspected source, not a claim that every project's runtime tests were rerun during this documentation refresh. Published test results belong to the linked project workflows and dated verification notes.

## Design and content

Keep the existing violet identity, local SVG hero and introduction, KeyTurn screenshot, grouped technology badges, themed statistics and contribution snake. Artwork and statistics have accessible text alternatives. The hero, typing introduction and contribution calendar provide reduced-motion behavior.

The original layout study used [subhobhai943](https://github.com/subhobhai943/subhobhai943), [Anurag Hazra](https://github.com/anuraghazra/anuraghazra) and [Simon Willison](https://github.com/simonw/simonw) as structural references. No biography, accomplishments or credentials were copied. The local badges describe technologies present in the public projects; additional Android, collaboration and Python tools are listed as text rather than adding a new badge dependency.

Update project wording when source changes. Label prototypes and branch-specific capabilities clearly. Preserve third-party licenses and attribution; do not invent proficiency levels, employment, users, outcomes, testimonials or activity.

## Profile settings and project pins

The README does not change account settings or repository visibility. Suggested pins are Lensqivo, bookdesign, SyncVerse and Algorithmic Lab. An optional bio is: `Software developer building web and Android projects, with an interest in interaction design, local persistence and thoughtful engineering.`

Add contact details or affiliations only when the owner chooses to make them public. Direct project questions to the relevant public issue tracker. Verify demo availability before adding or replacing a live-demo link.

## Statistics and automation

The `public-stats` markers in README.md are owned by [update-stats.mjs](../scripts/update-stats.mjs). Keep exactly one opening and closing marker. Its public-user GitHub API requests exclude private repositories; language percentages measure source bytes, not proficiency or coding time. JSON, dark/light SVGs and accessible README numbers must stay consistent. Preserve the last successful snapshot if an API call fails.

[Refresh profile assets](../.github/workflows/profile-assets.yml) updates the local hero, statistics and actual contribution snake on its configured schedule, manual dispatch and generator changes. The existing workflow pins actions to full commit hashes, uses a bounded job and grants write access only to its refresh job. It commits an explicit asset allowlist. Never fabricate calendar activity or remove the upstream snake attribution.

[Profile quality](../.github/workflows/profile-quality.yml) checks profile logic, README references, SVG structure, snapshot consistency and workflow policy. Changes to workflow permissions, schedules or generators are separate from ordinary project-copy edits.

## Local validation

Node.js 24 is sufficient for the repository tools; no npm dependencies are required for these checks.

```powershell
node --test scripts/profile.test.mjs
node scripts/check-profile.mjs
node scripts/check-profile.mjs --links
```

The optional link check requires network access. Inspect the rendered profile in light/dark themes and narrow viewports; confirm images, project links, disclosure controls and reduced-motion alternatives after the final edit.

To refresh statistics, use `node scripts/update-stats.mjs` with network access, or let the existing GitHub workflow run. Do not copy private API responses or credentials into the snapshot.
