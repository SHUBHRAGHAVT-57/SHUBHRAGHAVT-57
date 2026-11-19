# Profile guide

## Public project scope

The profile content was reviewed on **19 November 2026** against connected public GitHub source. It presents five public software projects. Private repository names, code, demo accounts and implementation details are excluded from the public profile.

| Project | Evidence used for the README |
| --- | --- |
| [KeyTurn / bookdesign](https://github.com/SHUBHRAGHAVT-57/bookdesign) | React/TypeScript/Vite source, localStorage state, deterministic recall/review scoring, service worker, Vitest and Playwright configuration |
| [Lensqivo](https://github.com/SHUBHRAGHAVT-57/Lensqivo) | Kotlin/Compose application, CameraX photo/video paths, Media3 effects, Java core and Android quality workflow; physical-device qualification remains pending |
| [SyncVerse](https://github.com/SHUBHRAGHAVT-57/syncverse) | Yjs/CodeMirror editor, IndexedDB persistence, local WebSocket relay, Markdown preview/export and test configuration; production authentication and access control are absent |
| [For You](https://github.com/SHUBHRAGHAVT-57/Gift-for-Soemeone) | TypeScript/Three.js gift creator, Unicode-safe URL-fragment sharing, recipient reveal, reduced motion and static graphics fallback; the note is readable by anyone with the complete link |
| [Algorithmic Lab](https://github.com/SHUBHRAGHAVT-57/algorithmic-lab) | Four Python algorithm implementations, documented contracts, unittest cases and Python CI |

Project features describe inspected source, not a claim that every project's runtime tests were rerun during this documentation refresh. Published test results belong to the linked project workflows and dated verification notes.

## Design and content

Keep the existing violet identity, local SVG hero and KeyTurn screenshot. Put selected projects and their evaluation links before tools and activity. The badge, introduction, button and footer assets remain available to the existing generator; displaying every generated asset is unnecessary. Themed statistics and the contribution calendar sit in an optional disclosure, with accessible text alternatives and reduced-motion behavior preserved.

The original layout study used [subhobhai943](https://github.com/subhobhai943/subhobhai943), [Anurag Hazra](https://github.com/anuraghazra/anuraghazra) and [Simon Willison](https://github.com/simonw/simonw) as structural references. No biography, accomplishments or credentials were copied. The local badges describe technologies present in the public projects; additional Android, collaboration and Python tools are listed as text rather than adding a new badge dependency.

Update project wording when source changes. Label prototypes and branch-specific capabilities clearly. Preserve third-party licenses and attribution; do not invent proficiency levels, employment, users, outcomes, testimonials or activity.

## Profile settings and project pins

The README does not change account settings or repository visibility. Suggested pin order is bookdesign (KeyTurn), Lensqivo, syncverse, Gift-for-Soemeone (For You), then algorithmic-lab. The profile repository does not need a pin. An optional bio is: `Software developer building web and Android projects, with an interest in interaction design, local persistence and thoughtful engineering.`

Use product names in visible copy and identify the existing public source beside them. Preserve the bookdesign and Gift-for-Soemeone repository URLs and hosting paths until a separately verified migration maintains source links, Pages assets and saved gifts.

Add contact details or affiliations only when the owner chooses to make them public. Direct project questions to the relevant public issue tracker. Verify demo availability before adding or replacing a live-demo link.

Keep the public profile centered on projects and their engineering decisions. [Project engineering notes](project-notes.md) connect claims to the inspected public source and preserve collaborator attribution.

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

## Source-use terms

The [MIT license](../LICENSE) applies to original profile text, scripts and locally authored artwork where the owner holds those rights. [Third-party notices](../THIRD_PARTY_NOTICES.md) preserve the contribution generator, badge/logo and reference provenance. Public visibility does not transfer ownership of third-party marks or other projects' source.
