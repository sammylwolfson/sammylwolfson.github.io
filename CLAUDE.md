# CLAUDE.md — sammylwolfson.github.io
Owner: Sammy Wolfson (solo). Audited 2026-07-31 (first-run).

## What this is
Personal link-in-bio / landing site served via GitHub Pages (custom domain via CNAME). Config-driven: index.html + main.js read from config.json to render links and pick a theme from styles/ (dark, bright, minimal, kubrik, bulky, core). crypto-js is bundled (likely for an obfuscated/gated link). Static, no backend. Same template family as the highkey21st repo.

## Rules
- Branch cody/nightly-YYYY-MM-DD only, never commit to main. No deploys/payments/external services without Sammy approval.
- Update Backlog + Run Log every run; summary to Agent Memory as dated file.

## Proposed backlog (for Sammy's review)
1. Reconcile this with highkey21st — they share the template; decide on one source of truth so fixes don't have to be made twice.
2. Confirm why crypto-js is loaded (gated link?) and document it in config.json comments.
3. Add basic OG/Twitter meta tags + favicon completeness for nicer link previews.

## Run Log
- 2026-07-31 (first-run audit): read structure + git log, filled "What this is", proposed backlog. No code changes. Working tree clean.
