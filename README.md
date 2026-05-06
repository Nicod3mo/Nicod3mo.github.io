# Nicolas Segovia Portfolio

This is a static portfolio site for Nicolas Segovia, focused on data analysis, Python projects, and Power BI work. The site is intentionally lightweight: plain HTML, CSS, JavaScript, and static assets that can be served directly by GitHub Pages.

## What is in the site

- A landing section with a short personal introduction.
- Project tabs for Python and Power BI work.
- A small top-right Webamp easter egg opened by the `Don't click me` button.
- A custom cursor based on the paper-plane cursor asset.
- Static project images and portfolio copy.

## Running locally

Run the site through a local HTTP server rather than opening `index.html` directly. This keeps module scripts, external imports, audio paths, and static assets behaving like they will on GitHub Pages.

```powershell
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

If `python` is not available on PATH, use the bundled runtime from Codex:

```powershell
C:\Users\Nicod\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m http.server 8000
```

## Webamp easter egg

The Webamp integration lives in:

```text
assets/js/webamp-player.js
```

It lazy-loads Webamp from the CDN only when the user clicks the `Don't click me` control, so the main page stays light. It does not autoplay.

The current playlist uses nine MP3 files named as a hidden sentence:

```text
incoming-assets/01. As.mp3
incoming-assets/02. Gregor.mp3
incoming-assets/03. Samsa.mp3
incoming-assets/04. awoke.mp3
incoming-assets/05. one.mp3
incoming-assets/06. morning.mp3
incoming-assets/07. from.mp3
incoming-assets/08. uneasy.mp3
incoming-assets/09. dreams.mp3
```

The words are displayed in Webamp in order as:

```text
As Gregor Samsa awoke one morning from uneasy dreams
```

The Winamp skin is:

```text
incoming-assets/Winamp3_Classified_v5.5.wsz
```

## Custom cursor

The original cursor source is:

```text
incoming-assets/mouse-cursor.png
```

Browsers can ignore oversized custom cursor images, so the site uses this generated 32px version:

```text
incoming-assets/mouse-cursor-32.png
```

The cursor is applied globally in `assets/css/main.css`.

## Asset notes

The `incoming-assets` folder is currently part of the production site. Do not delete it unless the paths in `assets/js/webamp-player.js` and `assets/css/main.css` are updated first.

## Deployment

This repository is intended for GitHub Pages. Pushing to `master` updates the published static site according to the repository's Pages settings.
