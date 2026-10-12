# ORATA — Production Specification & Documentation

> "Think fast. Speak clearly. Improve deliberately."

Orata is an AI-powered speaking practice studio built around a focused, repeatable improvement loop:
**Spin → Speak → Get Coached → Try Again → Improve**

---

## 1. Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Vanilla CSS & Tailwind with Curated Editorial Palette
- **Audio & Speech Capture**:
  - Live Browser Web Speech API (`SpeechRecognition`) for local real-time speech-to-text
  - HTML5 Web Audio API (`AudioContext` + `AnalyserNode`) for real-time waveform visualizer
  - Fallback typing option when microphone permissions are denied
- **AI Engine (Server-Side)**:
  - Route: `POST /api/ai/analyze` — Evaluates Clarity, Structure, Fluency, Conciseness with actionable focus area formula
  - Route: `POST /api/ai/insight` — Contextual thinking exercise and angle generation
  - Zero client-side API key leakage
  - Integrated rate limiting, token limits, in-memory deduplication caching
  - Resilient local deterministic fallback when external AI keys are absent or exhausted
- **Storage & State**:
  - LocalStorage / IndexedDB persistence for sessions, repeat attempts, scores, and preferences
  - No mandatory authentication or account required

---

## 2. Color System

```json
{
  "bright_snow": "#FAF9F9",
  "text_primary": "#22242C",
  "blue_slate": "#555B6E",
  "muted_teal": "#89B0AE",
  "frozen_water": "#BEE3DB",
  "peach_fuzz": "#FFD6BA",
  "peach_accent": "#FFA060",
  "dark_recording_bg": "#111216",
  "dark_surface": "#22242C",
  "dark_border": "#333642"
}
```

---

## 3. Product Features & Screens

1. **Practice Hub (Light Editorial)**:
   - Mode Selection: Impromptu, Interview, Communication
   - Niche Selector: 20 Categories (Random, Technology, Business, Career, Fashion, etc.)
   - Signature Roulette: Tactile vertical stream with acceleration, velocity, natural mechanical deceleration, and landing
   - Spin Again: Replays kinetic scrolling animation without repeating the current topic
   - Inline "Think about it": Expandable contextual insight with angles and facts
2. **Recording Studio (Dark Immersive)**:
   - Dark Blue Slate theme (`#111216`)
   - Reactive audio waveform bars
   - Radial countdown timer
   - Start / Finish / Restart controls
3. **Processing State**:
   - Intentional, minimal status indicators
4. **Coaching Results (Light Editorial Analytics)**:
   - Overall Score gauge (0–100)
   - Core metrics: Clarity, Structure, Fluency, Conciseness
   - Focus Area breakdown with "Why it matters" and concrete 3-step formula
   - Repeat attempts tracker (Attempt 1 → Attempt 2 → Attempt 3)
   - "Try Again" re-tests the exact same challenge to demonstrate improvement
5. **Progress View**:
   - Session velocity, metric averages, current focus, and attempt history
6. **Premium Feature Map**:
   - Visual hub-and-spoke editorial layout connecting premium capabilities
7. **Settings**:
   - Microphone diagnostics, data management, privacy controls
