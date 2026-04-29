# RIPPLE — Water Tracking App · Product Brief

> Frictionless hydration tracking · dark-first · bioluminescent UI

A high-fidelity, interactive product brief for a minimalist water tracking app. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## Live Demo

Deploy to **GitHub Pages** for a live link:
1. Go to your repo on GitHub
2. Settings → Pages → Source: `main` branch → `/ (root)`
3. Your brief will be live at `https://<your-username>.github.io/<repo-name>/`

---

## Project Structure

```
ripple/
├── index.html          # Main entry point
├── README.md
├── css/
│   ├── base.css        # CSS variables, reset, body, range inputs
│   ├── components.css  # All UI components (phone, cards, panels)
│   ├── layout.css      # Grid, hero, responsive breakpoints
│   └── animations.css  # Keyframes and transitions
└── js/
    ├── data.js         # All static content (features, specs, tokens)
    ├── phone.js        # Phone mockup — tap-to-log interaction
    ├── activeHours.js  # Active hours slider visualizer
    ├── algorithm.js    # Nudge engine calculator
    ├── render.js       # Renders dynamic content from data.js
    └── main.js         # App boot / init
```

---

## Features Showcased

| Feature | Description |
|---|---|
| **One-tap logging** | Interactive phone mockup — tap to log 250 ml and watch the wave rise |
| **Smart nudge engine** | Live algorithm calculator with urgency color shifts |
| **Active hours** | Drag sliders to configure wake/sleep window |
| **Lock-screen notifications** | Pixel-accurate mockup with contextual copy variants |
| **Design tokens** | Full color palette, typography, spacing, and motion specs |

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, CSS Grid, Flexbox, keyframe animations
- **Vanilla JS** — no libraries, no build tools required

---

## Customization

All content lives in `js/data.js`. To update features, specs, color tokens, or notification copy — edit that one file. The renderer (`js/render.js`) picks up the changes automatically.

To change the daily water goal or default log amount:
```js
// js/data.js
RIPPLE.GOAL    = 2500;  // ml
RIPPLE.LOG_AMT = 250;   // ml per tap
```

---

## Deploying to GitHub (Mobile)

**Option A — GitHub website (easiest on mobile):**
1. Create a new repo on github.com
2. Tap **Add file → Upload files**
3. Upload all files keeping the folder structure intact
4. Commit to `main`
5. Enable GitHub Pages in Settings

**Option B — Working Copy (iOS) / MGit (Android):**
1. Clone your repo
2. Copy project files in
3. Commit + push

---

## License

Concept design — free to use for learning and portfolio purposes.
