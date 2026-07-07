# VoterWatch Nigeria 🇳🇬

An independent, full-stack, data-driven Voter Registration and Electoral Integrity analytics platform for Nigerian elections. Built on the statutory mandates of the **Electoral Act 2022** and leveraging the power of **Gemini 3.5-flash AI** to detect statistical anomalies, map connectivity, track compliance, and generate Section 19 objection briefs.

## 🚀 Product Vision & Intent
The "Participation Paradox" in Nigeria shows that while registered voters have increased by over 35 million since 1999, actual voter turnout has steadily plummeted, reaching an all-time low of **26.7% in 2023**. VoterWatch Nigeria acts as a transparent citizen audit layer, converting raw administrative records and geopolitical details into actionable insights for Civil Society Organizations (CSOs like Yiaga Africa), investigative journalists, political researchers, and citizens.

---

## 💎 Core Product Modules & Features

### 1. 📈 Electoral Pulse & Comparative Funnel
*   **Historical Timeline Indicator**: Interactive dual-axis visualizer representing registered voter growth (1999 → 2023) mapped against actual votes cast to isolate voter apathy or database bloating.
*   **Voter Engagement Funnel**: Side-by-side funnel visualization mapping of State-level voter registration lifecycles ($\text{Registered} \rightarrow \text{PVC Collected} \rightarrow \text{Actual Votes Cast}$) to observe registration inflation risks.

### 2. ⚡ Weekly Velocity & Saturation Sandbox
*   **Velocity Tracker (The "Osun Anomaly" Logic)**: Simulates the velocity of Continuous Voter Registration (CVR). Instantly flags LHAs or states gaining pre-registrations at statistically implausible tempos compared to historical 2-year baselines.
*   **Demographic Saturation Inspector**: Uses projected National Population census benchmarks to identify and flag regions reporting more registered voters than the absolute living adult population (saturation $> 100\%$).

### 3. 📡 Polling Unit Search & Connectivity Maps
*   **176,846 Polling Unit Roster**: Searchable catalog of individual local government polling stations across surveyed states.
*   **Carrier Signal Telemetry Simulator**: Maps 3G/4G/Offline transmission queues of major regional networks (MTN, Airtel, Glo). Predicts transmission bottlenecks for the Bimodal Voter Accreditation System (**BVAS**) before Election Day results can upload to the public **IReV portal**.

### 4. ⚖️ Act Compliance Ledger
*   **Electoral Act 2022 Mandate Tracker**: Active catalog of critical statutory provisions (Sections 9, 10, 12, 16, 19, and 47) mapped against realistic administrative deadlines, status badges (Compliant / Delayed), and legal breach penalties.
*   **Proposed Reforms Docket**: Interactive tracker spotlighting continuous CSO lobbying agendas (independent registry audits, early voting, alternative ID provisions).

### 5. 📑 Section 19 Crowdsourced Cleanup Portal
*   **Citizen Dispute Registries**: Compiles real-time complaints concerning deceased electors, underage registrants, doubled biometrics, and non-citizen infiltration.
*   **Printable Compliant Briefs**: Formats official complaints with factual details and verifiable exhibits into printable Section 19 administrative objection files.

### 6. 🔮 AI Forensic Consultant & Claim Auditor
*   **AI Forensic Claim Auditor**: Powered by server-side **Gemini 3.5-flash AI**. Analyzes user observations of registered anomalies and compiles a professional, formalized Section 19 petition ready to sign and file at tribunals.
*   **VoterWatch AI Consultant**: A conversational interface advising on the Electoral Act, ABIS biometric deduplication algorithms, and historical mobilization statistics.

---

## 🛠️ Technical Stack & Architecture

*   **Frontend**: React 18 with Vite, styled with custom responsive **Tailwind CSS**, and utilizing Inter, Space Grotesk, and JetBrains Mono display typography.
*   **Backend Server**: Express (TypeScript) proxying Gemini 3.5-flash AI inference to securely maintain API key privacy.
*   **AI Integration**: `@google/genai` SDK for low-latency structural generating.
*   **Build Bundler**: Fast, specialized `Vite` for development and CJS `esbuild` server optimization for production containers.

---

## 📦 Local Installation & Setup

1.  **Clone or Download**: Gather project files into your local environment.
2.  **Configure Environment Secrets**:
    Create a `.env` file in the root directory:
    ```env
    GEMINI_API_KEY="YOUR_ACTUAL_GOOGLE_GEMINI_API_KEY_HERE"
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Compile & Build for Production**:
    ```bash
    npm run build
    npm run start
    ```

---

## 📂 Project Organization & Directory Structure

```text
├── package.json               # Scripts, build systems, & dependencies
├── server.ts                  # Production Express API & Vite Dev server
├── tsconfig.json              # Strict TypeScript configurations
├── vite.config.ts             # Vite server proxies & asset aliases
├── src/
│   ├── main.tsx               # Primary react entry point
│   ├── App.tsx                # Dashboard layout & route tabs configuration
│   ├── types.ts               # Shared types, compliance models, and schemas
│   ├── index.css              # Custom font bindings and tailwind layers
│   ├── data/
│   │   └── electionData.ts    # Seed datasets (turnout numbers, states, and LGAs)
│   └── components/
│       ├── Dashboard.tsx      # Pulse timelines and engagement funnels
│       ├── PUMap.tsx          # Geopolitical maps and signal simulators
│       ├── AnomalyDetector.tsx# Osun velocity calculators
│       ├── ComplianceTracker.tsx # Legal act trackers
│       ├── CleanupPortal.tsx  # Objection checklists and file managers
│       └── AIConsultant.tsx   # Interactive chat and Forensic claims advisors
```

---

## ⚖️ License
Licensed under the Apache-2.0 License.
