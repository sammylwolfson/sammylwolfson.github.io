# CLAUDE.md — sammylwolfson.github.io
Owner: Sammy Wolfson (solo). Audited 2026-07-31 (first-run).

## What this is
Personal link-in-bio / landing site served via GitHub Pages (custom domain via CNAME). Self-contained static page:  +  + , profile photo in . Rewritten 2026-08-30 as a static bio, replacing the old config-driven setup ( +  reading ); the dead config-driven files were removed 2026-10-07. Static, no backend. Same template family as the highkey21st repo.

## Rules
- Branch cody/nightly-YYYY-MM-DD only, never commit to main. No deploys/payments/external services without Sammy approval.
- Update Backlog + Run Log every run; summary to Agent Memory as dated file.

## Proposed backlog (for Sammy's review)
1. Reconcile this with highkey21st — they share the template; decide on one source of truth so fixes don't have to be made twice.
2. ~~Confirm why crypto-js is loaded (gated link?) and document it in config.json comments.~~ — resolved 2026-10-07: dead code from the old template, removed.
3. ~~Add basic OG/Twitter meta tags + favicon completeness for nicer link previews.~~ — done 2026-10-07.

## Run Log
- 2026-07-31 (first-run audit): read structure + git log, filled "What this is", proposed backlog. No code changes. Working tree clean.
- 2026-10-07 (site hygiene): removed dead config-driven files (, , , , , , , ); replaced broken Substack feed auto-fetch with a hardcoded latest-post section (marked for hand updates); added OG/Twitter meta tags; stripped Spotify  share token; extracted base64 profile photo to ; refreshed README. PR opened for Sammy's review, not merged.
