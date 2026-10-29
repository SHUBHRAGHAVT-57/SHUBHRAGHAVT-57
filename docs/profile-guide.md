# Profile guide

## What was verified

Public GitHub API evidence on 2026-10-29 listed two owner repositories: `bookdesign` and `SHUBHRAGHAVT-57`. Only these public repositories inform this profile. Account settings and project repositories were left unchanged.

The [public KeyTurn source](https://github.com/SHUBHRAGHAVT-57/bookdesign) supports the React/TypeScript/Vite stack, local persistence, deterministic review scoring, offline service worker, Vitest configuration and Playwright scenarios. The live demo returned HTTP 200 and opened the book. `assets/keyturn.webp` is a fresh browser screenshot of that demo, with no invented interaction, performance numbers or testimonials. Project tests were inspected as source; this mission did not rerun that separate project's test suite.

The former Next.js, PostgreSQL and backend Node.js badges were removed because the public project does not substantiate those stack claims. No email, social account, college or affiliation was added. The contact route is the existing public project issue tracker.

## Design and references

The original violet identity and KeyTurn feature were retained. A live comparison with the reference led to a more vivid second pass: an electric-violet hero, geometric SR mark with a slow orbit and light-trail animation, locally generated typing introduction, compact action buttons, nine colorful technology badges, and a tighter project section. All hero/typing motion stops under reduced motion; the contribution snake has an actual static alternative. The first animation frame shows a complete introduction so the page makes sense immediately.

The badges were downloaded once from Shields.io and stored locally, including their embedded logo data; profile views do not make runtime badge-service requests. Their contents reflect only the technologies evidenced in the public project. Badges retain their original decimal dimensions, with matching SVG viewBoxes checked to prevent cropping. The stronger appearance comes from contrast, rhythm and visual variety; no extra projects, experience or credentials were invented.

The [requested reference source](https://github.com/subhobhai943/subhobhai943/blob/main/README.md) uses capsule-render for a fading wave header, a hosted typing SVG, extensive Shields badges, section dividers, project tables, social buttons, hosted statistics and a snake from an output branch. Its [snake workflow](https://github.com/subhobhai943/subhobhai943/blob/main/.github/workflows/snake.yml) runs on a schedule/manual dispatch/push and publishes with a separate Pages action. Useful ideas retained here: a strong first impression, clear stack grouping, project specificity and automated contribution artwork. This implementation uses owned artwork, fewer competing elements and no extra output branch or publication action.

Two additional focused references were [Anurag Hazra](https://github.com/anuraghazra/anuraghazra), for the hierarchy of introduction, work and source links, and [Simon Willison](https://github.com/simonw/simonw), for useful, source-driven automation. No credentials, accomplishments, biography or design assets were copied from another developer. GitHub Readme Stats returned HTTP 503 during research; the profile therefore uses stored, dated API snapshots rather than runtime widget embeds.

## Recommended settings — manual changes only

1. Open your [profile](https://github.com/SHUBHRAGHAVT-57), click **Edit profile**, set **Name** to `Shubh Raghav` and **Bio** to `Software developer building thoughtful web experiences. Interested in full-stack development, accessible interfaces, and product craftsmanship.` Click **Save**. Keep contact and affiliation fields empty until you choose to publish them.
2. On your profile, choose **Customize your pins**, select `bookdesign` first and optionally this profile repository second, then **Save pins**. A single substantive project is enough; add more pins when there is more public work worth exploring. [GitHub's pinning steps](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile).
3. In `bookdesign`, click the gear beside **About**. Suggested description: `KeyTurn: reading, typing, and recall practice with local progress and offline support.` Keep the verified website `https://bookdesign-wine.vercel.app`. Suggested topics: `react`, `typescript`, `vite`, `typing-practice`, `recall`, `offline-first`, `localstorage`, `vitest`, `playwright`. Click **Save changes**.
4. In the profile repository's **About** gear, use `Shubh Raghav — software developer focused on thoughtful products and engineering craftsmanship.` Suggested topics: `github-profile`, `profile-readme`, `svg`, `github-actions`, `developer-portfolio`.

These are recommendations, not changes made to GitHub. The mission authorizes automatic local writes only in the profile repository.

## Public project improvements, in priority order

| Priority | Repository | Concrete follow-up |
| --- | --- | --- |
| First | `bookdesign` | Add the description/topics above and a screenshot directly after the README introduction. Keep the live demo near the top. |
| First | `bookdesign` | Clarify which folder is canonical. The public tree contains both root source and `bookdesign-main/`; review references and history before consolidating them in a separate approved change. |
| First | `bookdesign` | Verify a clean install and reconcile the root lockfile with the documented setup. The audit found a very small root lockfile alongside a much larger nested lockfile. Publish the actual tested Node/npm versions. |
| Next | `bookdesign` | Add CI for the existing unit tests, type checking/build and browser smoke flow, then show a status badge only after the workflow succeeds. Document which checks run on each PR. |
| Next | `bookdesign` | Extend the good module map with a small state/persistence diagram, the storage schema/version migration policy, and the service-worker update strategy. Keep recall and retention limitations visible. |
| Next | `bookdesign` | Use a first tagged release only after a reproducible clean build and a checked demo. Release notes should list actual behavior, fixes and known limitations. |
| Later | `bookdesign` | Add issue templates and a short contribution guide when external contributors would benefit: setup, tests, reproduction steps and scope expectations. Review the project's license status with the owner before changing it. |
| Ongoing | Profile | Add another featured project only once it is public, documented and independently inspectable. Refresh screenshots when the demo changes. |

No project source, visibility, license or ownership was changed. None of these project recommendations claims that a separate project's tests passed.

## Automation and activation after publication approval

`profile-assets.yml` refreshes the hero, introduction, link buttons, footer, public source statistics and snake at **08:19 UTC / 13:49 IST daily**, on manual dispatch, and when its generator files change on `main`. Only its refresh job has `contents: write`; all other permissions default to none. Checkout does not persist credentials. A token is supplied only to the read API calls, pinned snake action and final authenticated push. Actions are pinned to full verified commit hashes. There is no PAT or external publication service. Technology badges are static assets, changed when the evidenced stack changes.

`profile-quality.yml` runs on pushes to `main`, pull requests, manual dispatch and Mondays at **09:43 UTC / 15:13 IST**. It has read-only repository access and checks snapshot logic, local links, HTML structure, SVG policy, workflow pins and seven external README URLs. It does not execute fork PR code with write access. Dependabot proposes monthly action updates.

The asset job commits only its explicit README/SVG/JSON allowlist after every generation/check succeeds. A failed API call, failed snake generation or failed validation stops publication and leaves the previous committed images available. Concurrent refreshes are serialized; a conflicting newer push is rejected normally, without a force push. Inspect the failure and rerun from the current `main`. No activity is fabricated; bot asset updates are maintenance, not development accomplishments.

After you approve publication:

1. Push the prepared local commit to this repository's `main` branch.
2. Open the repository's **Actions** tab. If GitHub asks whether to enable Actions, enable them. The initial push should start both workflows because it adds their configuration and generators.
3. Open **Refresh profile assets** → **Run workflow** → `main` if a manual retry is needed. Then check that all steps finish successfully and the generated asset commit appears. Open **Profile quality** and confirm its checks too.
4. If an organization policy blocks an action, use **Settings → Actions → General → Actions permissions** to allow the specifically pinned official checkout/setup-node actions and `Platane/snk/svg-only`. Do not broadly enable all actions just to bypass a restriction.
5. The workflow declares its own job-level write permission. If an organization policy or branch rule still blocks the bot push, do not disable protections. Inspect the error and adapt updates to your repository's approved PR process. No such restriction has been assumed or changed here.
6. Open your actual GitHub profile in both themes and on mobile after the push. Browser/CDN caches may lag the commit. No profile publication or hosted workflow run has occurred during this local preparation.

Scheduled jobs can be delayed, and GitHub may disable schedules in public repositories after 60 days without activity. Check **Actions** periodically and re-enable the scheduled workflow there if GitHub disables it. The README continues using its last stored images. See [GitHub's schedule documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

## Maintaining the profile

Node.js 24 is sufficient for the checked-in tools; there is no npm install step or package dependency tree.

```text
node --test scripts/profile.test.mjs
node scripts/check-profile.mjs
node scripts/check-profile.mjs --links
node scripts/build-hero.mjs
node scripts/update-stats.mjs
```

The last command reads only the public-user repository endpoint and public language endpoints, then regenerates JSON, themed SVGs and the accessible README numbers together. The optional `GITHUB_TOKEN` reduces API rate-limit pressure in Actions. Do not place tokens in files. The snake is generated by the pinned action; `prepare-snake.mjs` adds accessible descriptions and derives non-animated contribution grids. Never replace the real contribution data with a fixture in published assets.

## A realistic activity routine

- **Two to four focused sessions a week:** choose a concrete user problem, make a cohesive change, run its relevant checks and commit when there is a useful unit of work. A productive week may have two commits or twenty; a daily streak is not a goal.
- **One project improvement a week:** resolve a reproducible bug, improve error handling, add a meaningful test, simplify a module or explain an important design decision. Keep screenshots and setup instructions aligned with the shipped behavior.
- **One small open-source contribution every few weeks:** use a tool enough to notice a real issue; read its contribution guide and existing issues; reproduce the problem; discuss the intended scope when needed; send a focused PR with tests, before/after evidence and a clear description. Follow up on review and accept a maintainer declining the approach.
- **One monthly engineering note or release:** explain a problem, the alternatives, the tradeoff chosen and how it was checked. Link the actual issue/PR/commit. Publish releases only when something useful is ready, with known limitations.
- **Earn attention by being useful:** answer questions you can verify, provide minimal reproductions and share short demos in relevant communities where they are welcome. Do not ask for reciprocal stars or publish exaggerated benchmarks.
- **Earn achievements through the work itself:** genuine merged PRs, collaborative work and useful accepted discussion answers can receive GitHub recognition where eligible. Do not use throwaway PRs, self-stars, manufactured coauthors or achievement farming. Award availability and criteria can change; treat badges as a side effect, never a credential to promise.

Use a GitHub-connected email or GitHub's private noreply address for legitimate attribution; review **Settings → Emails** before publishing commits. Qualifying contributions can take up to 24 hours to appear, and ordinary commits on a non-default branch may not count until they reach the default branch. [GitHub's contribution troubleshooting guide](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/troubleshooting-missing-contributions).

## Validation evidence — 2026-10-29

The exact revised README was rendered with GitHub's REST Markdown API in GFM mode and this repository's context. Its SHA-256 was `4c13fb4772623b248f62ea085e578bcde2ef106f2920a00c9f0116c0290ddd6b`. All five picture-source media queries survived GitHub sanitization, including mobile and reduced-motion rules.

The preview used that GitHub-rendered HTML with `github-markdown-css` v5.8.1 and an approximate GitHub content column. Playwright Chromium checked **1440px, 375px and 320px**, each in **dark and light** mode. All six scenarios loaded 18 images, stayed within the viewport, opened both disclosures and selected the correct static contribution image under reduced motion. Scoped axe scans with WCAG 2 A/AA and WCAG 2.1 AA tags reported **zero violations**. Separate browser checks confirmed that both hero SVGs and the typing SVG actually animate normally and stop under reduced motion. Automated checks do not constitute a complete accessibility certification or replace the visual inspection performed here.

Preview evidence: [desktop dark](previews/desktop-dark.webp), [desktop light](previews/desktop-light.webp), [mobile dark](previews/mobile-dark.webp), [mobile light](previews/mobile-light.webp).

| Check | Actual result |
| --- | --- |
| `node --test scripts/profile.test.mjs` | 7 tests passed, including private/malformed evidence rejection, byte proportions, empty data, XML escaping and three failure-preservation scenarios |
| `node scripts/check-profile.mjs` | README structure, 37 references, 22 SVGs, badge dimensions, snapshot/text consistency and workflow policy passed |
| `node scripts/check-profile.mjs --links` | All 7 unique external README URLs returned HTTP 200 |
| Actionlint v1.7.12 | Both workflow files passed with no diagnostics; validator download verified against official SHA-256 checksums |
| XML parsing in Chromium | All 22 SVGs parsed without XML errors |
| Syntax and content review | All shipped JavaScript parsed, all YAML parsed, LF text policy passed, no credential-pattern matches |
| Git whitespace check | Passed after replacing Markdown trailing-space line breaks with explicit `<br>` elements |
| Snake generation | Pinned Platane/snk distribution generated both real SVGs from 369 anonymous public calendar cells representing 18 contributions; no synthetic activity |

The local snake generation used the unmodified pinned action distribution, verified against its Git blob hashes. A local adapter supplied the real anonymous GitHub calendar in the generator's expected GraphQL response shape, avoiding access to private account data or local credentials. The hosted workflow instead uses its repository-scoped `GITHUB_TOKEN` and the upstream action's normal GraphQL fetch. Both generated animations and their derived static grids are checked in, so the README has no nonexistent output-branch references.

The first version was published with approval: both hosted workflows passed and the live profile's images loaded at desktop and mobile widths. This second visual revision remains local for review; its own hosted workflow run and actual published page still need verification after a new approved push. Profile settings and project repositories remain unchanged. The public demo was opened and photographed; its separate full test suite was not executed in this profile repository.

## Changed-file map

- `README.md`: the profile itself.
- `assets/`: two hero SVGs, a typing introduction, three link buttons, a footer, nine technology badges, two statistics SVGs, two snake SVGs, two static contribution SVGs and the real KeyTurn screenshot.
- `data/public-profile.json`: dated, inspectable public statistics.
- `scripts/`: hero generation, statistics generation/rendering, accessible snake preparation, profile checks and meaningful regression tests. No production dependencies.
- `.github/`: two Actions workflows and monthly Dependabot action updates.
- `.gitattributes`, `.gitignore`: consistent text endings and exclusion of local research/preview tooling.
- `docs/`: the short implementation plan, this handoff guide and four preview screenshots. Local raw research, downloaded tools and browser scratch files are ignored.
