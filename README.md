ssrubin.com
===========

My personal website

## Setup

Install aube once (it also provisions the Node.js version pinned in
`.node-version`):

```
mise use -g aube
aube install
```

## Develop

Run a local dev server with live reload at http://localhost:8080:

```
aubr dev
```

## Build

Generate the static site into `_site/`:

```
aubr build
```

## Deploy

Pushing to `master` triggers the GitHub Action
(`.github/workflows/upload-website.yml`), which builds with aube and syncs
`_site/` to S3. The build output is not committed.

## Layout

- `src/` — site source
  - `index.njk`, `posts.njk`, `feed.njk`, `404.njk` — pages
  - `posts/` — blog posts (Markdown)
  - `pubs/` — publications (rendered inline on the homepage, not their own pages)
  - `_includes/layouts/` — Nunjucks layouts
  - `_includes/partials/` — homepage section content (Markdown)
  - `_data/site.js` — site metadata
  - `files/` — static assets (images, toys, styles) copied to the site root
- `classes/` — archived class projects, kept in the repo but not part of the build
