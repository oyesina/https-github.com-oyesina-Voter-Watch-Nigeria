# VoterWatch Nigeria - Design System & Extension Guide 🎨

This document provides a comprehensive breakdown of the visual aesthetics, design tokens, component architecture, and mathematical systems underlying **VoterWatch Nigeria**, along with actionable blueprints for developers wanting to build upon this foundation.

---

## 🌌 Visual Design System

VoterWatch is built on a custom **"Cosmic Slate"** aesthetic—a professional, terminal-like dark command center designed for high-density information display. The theme is configured to remove visual clutter and prioritize readable data layers over gratuitous decorative elements.

### 🎨 Color Palette & Semantics

The palette relies on deep charcoal and slate tones paired with deliberate, functional color highlights.

| Token | CSS Variable / Tailwind | Hex Value | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#020617` | `bg-slate-950` / Page Body | Immersive dark backdrop to prevent eye strain during long analytical reviews. |
| **Surface Card** | `#090d1f` / `#0f172a` | `bg-slate-900` / `border-slate-800` | Grid modules, comparison panels, and interactive elements. |
| **Primary Accent** | `#ef4444` | `text-red-500` / `bg-red-600` | Alerts, critical velocity spikes, objection triggers, and branding highlights. |
| **Safe Accent** | `#10b981` | `text-emerald-500` | Compliant milestones, normal velocities, and high signal strengths. |
| **Warning Accent** | `#f59e0b` | `text-amber-500` | Moderate anomalies, administrative delays, and network transmission queues. |
| **Text Primary** | `#f8fafc` | `text-slate-50` | Primary labels, display headers, and quantitative counts. |
| **Text Secondary** | `#94a3b8` | `text-slate-400` | Explanatory microcopy, legislative descriptions, and timestamp logs. |

### ✍️ Typography Strategy

VoterWatch pairs fonts to project a voice of rigorous, forensic scientific audit.

*   **Display Font (Space Grotesk)**: Used for primary module titles, state abbreviations, and hero headers. It is a tech-forward sans-serif with geometric structure, establishing an administrative and modern layout rhythm.
*   **Body Font (Inter)**: Applied to continuous text blocks, descriptions, and legal mandates. Highly legible at microscopic sizes on mobile screens.
*   **Mono Font (JetBrains Mono)**: Reserved for numerical metrics, turnout percentages, polling unit codes, dates, and calculated velocity metrics. Ensures alignment of aligned tabular data.

---

## 🧱 Component & Layout Architecture

The application is structured as a **Single-Page Command Center** with zero layout nesting to maintain full performance in sandboxed iframe environments. 

```text
                                   [App.tsx (Header & Telemetry)]
                                                 │
      ┌──────────────────┬───────────────────────┼───────────────────────┬────────────────────┐
      ▼                  ▼                       ▼                       ▼                    ▼
[Dashboard.tsx]      [PUMap.tsx]       [AnomalyDetector.tsx]  [ComplianceTracker.tsx]  [CleanupPortal.tsx]
 (Trend Lines,    (Geopolitical Map,     (Velocity & Saturation     (Statutory Deadlines,  (Section 19 Objections,
 Funnel Scales)     Signal Telemetry)       Math Sandboxes)         Reform Checklists)    Brief Print Engine)
```

### 📈 Layout Densities & Fluidity
*   **Fluid Constraints**: The dashboard wraps inside a strict `w-full max-w-7xl mx-auto px-4` template, ensuring metrics don't stretch excessively on ultra-wide screens, while adapting fluidly down to 320px mobile viewports.
*   **Decoupled State**: Local UI state (active comparison parameters, active sliders, and chat messages) is stored within functional React blocks rather than heavy global context. Local storage is used specifically to persist crowdsourced Section 19 objections.

---

## 🧮 Mathematical Engine & Simulation Logics

The product uses two core algorithmic formulas to identify anomalies without political bias, which are modeled in `AnomalyDetector.tsx`:

### 1. The Velocity Multiplier (The Osun Formula)
This checks if the current rate of provisional online signups is statistically viable compared to historical baseline averages:

$$\text{Weekly Baseline Average} = \frac{\text{Baseline 2-Year Growth}}{104 \text{ weeks}}$$
$$\text{Velocity Multiplier} = \frac{\text{Current 7-Day Growth}}{\text{Weekly Baseline Average}}$$

*   **Threshold Status**:
    *   $\text{Velocity} > 50x$: **CRITICAL SPIKE** (Infeasible for normal civic registration channels).
    *   $10x < \text{Velocity} \le 50x$: **HIGH SPIKE** (Requires biometric verification audit).
    *   $\text{Velocity} \le 10x$: **NORMAL PACING**.

### 2. Demographic Saturation
We compare voter rolls against physical projected adult population ceilings derived from census estimates:

$$\text{Saturation Density} = \left( \frac{\text{Active Registered Voters}}{\text{CPC Projected Adult Population (18+)}} \right) \times 100$$

*   **Logic**: If $\text{Saturation} > 100\%$, the system throws a demographic infraction alert, indicating a violation of Section 12 criteria (multiple registration/deceased voter records).

---

## 🚀 Blueprints for Extending the Product

Developers looking to scale VoterWatch from a high-fidelity prototype into a production-grade countrywide system can leverage these extension tracks:

### 🗺️ Track 1: Integrate Interactive Mapbox or Leaflet GIS
Currently, the map is rendered using a highly performant, custom interactive SVG grid matching coordinate nodes.
*   **Step**: Replace the SVG block in `PUMap.tsx` with a Mapbox or Leaflet component:
    ```typescript
    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
    // Map individual polling unit coordinates dynamically from a database
    ```
*   **Benefit**: Users can zoom from country-level heatmaps down to precise satellite grids of individual polling booths to spot geometric clusters of registration.

### 🗄️ Track 2: Durable Database Integration (Firestore or PostgreSQL)
Currently, Section 19 objections are stored locally inside the client's browser cache (`localStorage`) for privacy and instant responsiveness.
*   **Step**: Integrate Firestore to enable shared, real-time collaboration among CSOs:
    ```typescript
    import { getFirestore, collection, addDoc } from 'firebase/firestore';
    // Push submitted objections to a centralized database for public verification
    ```
*   **Benefit**: Live synchronization of reported voter anomalies across investigative newsrooms in real-time.

### 🔌 Track 3: Direct API Ingestion (INEC IReV and CVR portals)
*   **Step**: Integrate cron jobs or serverless functions to scrape or call the continuous registration portals to update the underlying baseline data in `electionData.ts` automatically.
*   **Benefit**: Eliminates manual PDF table scraping, transitioning VoterWatch into a real-time monitor.
