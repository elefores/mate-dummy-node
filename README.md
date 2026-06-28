# mate-dogfood-node

A small, intentionally outdated **Node.js** app used as a dogfooding fixture for
[MATE (Keep Up)](https://github.com/elefores). It gives keepup a realistic
target to run against in CI.

## The app

A tiny Express service (`src/index.js`) that mints widget IDs with `uuid`, plus a
Jest test suite (`test/`).

## Intentionally outdated dependencies

`package.json` pins everything a few major/minor versions behind current:

| Dependency | Pinned | Why it matters |
|------------|--------|----------------|
| `uuid` | `^3.4.0` | **Breaking gap.** The `require("uuid/v4")` deep import was removed in uuid v7. Upgrading forces `src/index.js` to switch to `const { v4: uuidv4 } = require("uuid")`. |
| `express` | `^4.17.1` | Behind the current 4.x patch line. |
| `lodash` | `^4.17.15` | Behind the current 4.17.x line. |
| `jest` | `^27.5.1` | Behind the current 29.x line. |

This makes keepup exercise the **AI code-upgrade path**, not just a version bump.

## keepup config

See [`kup.toml`](kup.toml): it includes JavaScript, names the runtime deps to
keep current, ignores `node_modules`, sets grouping thresholds, and selects the
Claude Code agent.

## CI

[`.github/workflows/keepup.yml`](.github/workflows/keepup.yml) runs keepup on a
weekly schedule (and on demand). Set these repository secrets for it to run:

- `KUP_LICENSE_KEY` — signed keepup license key
- `CLAUDE_CODE_OAUTH_TOKEN` — Claude Code agent token
- `ACCESS_TOKEN` — GitHub token used to push branches and open PRs
