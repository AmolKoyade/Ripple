# RIPPLE — Water Tracker v2

> Frictionless daily hydration tracking · dark-first · bioluminescent UI

A fully redesigned, feature-rich water tracker app built with vanilla HTML/CSS/JS.

---

## Project Structure

```
ripple/
├── index.html
├── manifest.json
├── README.md
├── css/
│   ├── base.css        # CSS tokens, reset
│   ├── components.css  # All UI components
│   └── animations.css  # Keyframes & transitions
└── js/
    ├── data.js         # Static data / nudge strings
    └── app.js          # Full app logic (single file)
```

---

## Features

| Feature | Description |
|---|---|
| **Onboarding** | First-run setup: pick daily goal & cup size |
| **Progress ring** | Animated circular progress with gradient fill |
| **Smart nudge** | Contextual messages based on time of day vs progress |
| **Quick add** | 6 preset amounts + custom input with presets |
| **5-sec undo** | Undo any log entry within 5 seconds |
| **Log history** | Today's drinks with delete per entry |
| **Weekly chart** | 7-day bar chart with goal-hit coloring |
| **Stats** | Glasses, streak, avg ml/hr, best day |
| **Settings** | Change goal, cup size, active hours |
| **Particle burst** | Visual feedback on every log tap |
| **Goal celebration** | Modal + ring animation when goal is hit |
| **PWA** | Installable on iOS/Android via manifest |

---

## Tech Stack

Vanilla HTML5 · CSS3 custom properties · ES5+ JS · No dependencies

## Deploying to GitHub Pages

1. Push all files to a GitHub repo
2. Settings → Pages → Source: `main` / `/(root)`
3. Live at `https://<username>.github.io/<repo>/`
