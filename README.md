# Memoire

> **A Personalized Dementia Companion & Care-Circle Intelligence Platform**  
> *Empowering individuals living with dementia to preserve autonomy, remember daily routines, and stay connected with the people they love.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF?style=flat)](https://recharts.org/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-1.33-F56565?style=flat)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Overview

Dementia affects more than 55 million people worldwide, eroding episodic recall, orientation, and confidence in daily life. For the individual, simple questions—*"Who is visiting today?"*, *"Have I taken my evening medicine?"*, or *"Who is in this photo?"*—can trigger intense anxiety and distress. For family members and caregivers, repetitive questioning and round-the-clock supervision often lead to emotional fatigue and burnout. Meanwhile, attending physicians rarely have access to objective, longitudinal data regarding the patient's day-to-day cognitive trajectory between clinical visits.

**Memoire** is an empathetic, multi-role web platform designed to bridge this gap. Built around the persona of **Raj Sharma (72)** and his dedicated care circle, Memoire delivers:
- **Dignified Daily Assistance for Patients**: High-contrast, calming interfaces featuring face recognition with adaptive memory priming, an infinite-patience conversational companion, structured routines, and one-tap emergency access.
- **Proactive Management for Caregivers**: Real-time routine scheduling, alert triage, support level tuning, and cognitive observation logging.
- **Warm Engagement for Families**: Direct voice messages, shared photo memories, and daily peace-of-mind adherence tracking.
- **Clinical Intelligence for Physicians**: Quantitative recall tracking across multi-week assessment periods, semantic question clustering, longitudinal trend charts, and automated assessment reporting.

---

## ✨ Core Design Principles

Memoire is engineered around dignity, calm, and continuity:

* **"The Thread" Signature Motif**: A gentle vertical thread runs through daily routine timelines, life story milestones, and clinical trend charts—symbolizing the holding together of personal narrative and continuity across time.
* **Warm, Grounded Aesthetics**: Rather than clinical whites or sterile greys, Memoire uses warm linen (`#E8DDD0`), deep maritime navy (`#1A2E44`), rich amber (`#8A5A2A`), soft terracotta (`#7A3B32`), and antique gold (`#7A661F`).
* **Cognitive Ergonomics**: Oversized interactive targets, generous typography ([Fraunces](https://fonts.google.com/specimen/Fraunces) for warm literary display and [Inter](https://fonts.google.com/specimen/Inter) for clean legibility), minimal distractions, and explicit accessibility support for reduced motion.

---

## 👥 The Four-Role Care Architecture

Memoire includes a built-in role switcher that lets you experience the system from each stakeholder's perspective:

```
                          ┌─────────────────────────────┐
                          │           MEMOIRE           │
                          │   Care-Circle Ecosystem     │
                          └──────────────┬──────────────┘
                                         │
        ┌──────────────────┬─────────────┴────────────┬──────────────────┐
        ▼                  ▼                          ▼                  ▼
┌───────────────┐  ┌───────────────┐          ┌───────────────┐  ┌───────────────┐
│    PATIENT    │  │   CAREGIVER   │          │    FAMILY     │  │    DOCTOR     │
│  (Raj Sharma) │  │(Ananya Sharma)│          │ (Priya Sharma)│  │ (Dr. Sharma)  │
├───────────────┤  ├───────────────┤          ├───────────────┤  ├───────────────┤
│• Familiar     │  │• Real-Time    │          │• Remote Peace │  │• Longitudinal │
│  Faces & Voice│  │  Dashboard    │          │  of Mind      │  │  Recall Trends│
│• Routine with │  │• Adaptive     │          │• Voice Note   │  │• Question     │
│  Self-Report  │  │  Support (L/M/H)         │  Messaging    │  │  Clustering   │
│• Ask-Anything │  │• Routine &    │          │• Shared Photo │  │• Period-over- │
│  AI Companion │  │  Alert Triage │          │  Memories     │  │  Period Delta │
│• Memory Vault │  │• Life History │          │• Daily Status │  │• Clinical     │
│• One-Tap Help │  │  & Insights   │          │  Pulse        │  │  Reports      │
└───────────────┘  └───────────────┘          └───────────────┘  └───────────────┘
```

---

### 1. 🧓 Patient View — Dignified, Simple & Reassuring

Designed specifically for someone experiencing mild-to-moderate cognitive impairment:

* **Daily Anchoring & Progress**: Welcomes the patient with clear time-of-day cues (*"Good afternoon, Raj"*), overall day progress (*"75% complete"*), and an immediate prompt for the next pending task.
* **Familiar Faces & Adaptive Recognition**:
  * Visual cards for close family members (Priya, Amit, Meena, Rahul) with relation tags.
  * Tap-to-recognize / camera scanner simulation providing instant recognition with audio voice introductions (*"Hi Dad, it's Priya! I love you"*).
  * **Adaptive Contextual Priming**: Automatically adjusts context depth based on caregiver-configured support level:
    * *Low*: *"This is Priya."*
    * *Medium*: *"This is Priya, your daughter."*
    * *High*: *"This is Priya, your daughter. You and Priya shared 'Priya's Graduation' in 2018."* with direct shortcuts to play her voice or view shared memories.
* **"Ask Anything" Memory Companion**:
  * An AI chat companion that responds with unconditional patience to repeated inquiries.
  * Understands queries about medications (*"What medicine do I take?"*), loved ones (*"Who is Priya?"*), meals (*"What's for breakfast?"*), and doctor appointments.
  * Every patient question is logged into a structured semantic pattern analyzer for caregiver and physician review.
* **Interactive Routine with Recall Feedback**:
  * Chronological cards for medication, meals, garden walks, quiet time, and family calls.
  * Rather than passive checkmarks, pending activities prompt the patient with gentle dignity:
    * **[ I REMEMBERED ]** — Logs independent episodic recall.
    * **[ I NEEDED THE REMINDER ]** — Logs supported adherence.
* **One-Tap "GET HELP" Emergency Modal**:
  * High-visibility, prominent button that immediately surfaces options to contact the primary caregiver, call family, or trigger emergency services.

---

### 2. 👩‍⚕️ Caregiver View — Proactive Oversight & Calm Control

Empowering professional or family caregivers (Ananya Sharma) to coordinate care without hovering:

* **Caregiver Dashboard**: Real-time snapshot of Raj's day, overall wellness status, routine completion percentage, immediate next activity, and high-priority flags.
* **Adaptive Support Level Selector**: Easily toggle patient recognition depth (*Low*, *Medium*, *High*) to match the patient's cognitive fluctuation throughout the day.
* **Routine Management**:
  * Add, edit, or remove activities with custom time slots, importance levels (*Critical*, *High*, *Medium*, *Low*), and categories (*Medicine*, *Meal*, *Exercise*, *Appointment*, *Family*, *Personal*).
* **People & Life Event Timeline Builder**:
  * Manage family profiles, color codes, relationship titles, and custom voice prompts.
  * Chronological timeline builder (graduations, family trips, birthdays) linked directly to the patient's recognition cards.
* **Memory Library Curation**: Maintain a collection of key life events that anchor personal identity.
* **Alert & Notification Triage**:
  * Real-time notification feed sorted by severity:
    * 🔴 **Critical**: Missed medication windows.
    * 🟡 **Medium**: Delays in routine physical activities.
    * 🟢 **Normal**: Successful activity completions.
  * Includes one-click contact resolution actions.
* **Cognitive Insights & Temporal Patterns**:
  * Identifies frequently repeated questions grouped by semantic topics.
  * Visualizes time-of-day clusters (e.g. noticing evening medication queries peak between 7:45 PM and 8:15 PM).

---

### 3. 👨‍👩‍👧 Family Member View — Warm Connection & Peace of Mind

Designed for distant or working family members (Priya Sharma) who want to stay close:

* **Daily Wellness Pulse**: At-a-glance confirmation that Raj has taken his medications, completed his routine, and is having a good day.
* **Send Voice Messages**: Record audio messages or send warm text notes (*"Hi Dad, I'll visit you today at 5 PM"*) that appear instantly in Raj's companion interface with playback buttons.
* **Shared Memory Albums**: Upload photos and memorable captions (*"Us at the beach, 2019"*) that flow directly into Raj's memory vault.

---

### 4. 🩺 Doctor / Clinical View — Longitudinal Cognitive Analytics

Bridging day-to-day home living with clinical assessment for Dr. Sharma:

* **Multi-Period Assessment Framework**:
  * Compares structured 2-week observation blocks (Period 1: Aug 1–14, Period 2: Aug 15–28, Period 3: Current).
* **Quantitative Recall Analysis**:
  * **Independent Recall Rate**: Percentage of routine tasks remembered without reminder prompts.
  * **Repeated Questions Count**: Aggregate volume of repetitive companion queries.
  * **Reminder Assistance Metric**: Number of times external cues were necessary.
  * **Critical Items Requiring Support**: Tracking high-stakes dependencies (such as evening medication compliance).
  * **Person Recognition Queries**: Frequency of difficulty identifying family members.
* **Semantic Topic Clustering**:
  * Categorizes repeated questions into clinical topics (*Evening Medication*, *Person Recognition*, *Doctor Appointments*, *Meals*).
  * Drill-down modal showing actual historical patient prompts, timestamps, and dates.
* **Interactive Longitudinal Trend Charts**:
  * Multi-period line charts powered by [Recharts](https://recharts.org/) illustrating trajectories in recall, repetitive questioning, and reminder dependency over time.
* **Automated Assessment Report Generator**:
  * Generates clinical summaries detailing recall statistics, topic distributions, time clustering observations, and comparative deltas between assessment periods.
* **Ethical Boundary Disclaimer**:
  * Explicitly highlights that Memoire's logs represent self-reported, observed home patterns for clinical decision support and do not replace professional diagnostic evaluation.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) | Component architecture, state management, and modern hooks |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) | Lightning-fast HMR and optimized production builds |
| **Data Visualization** | [Recharts 3](https://recharts.org/) | Responsive SVG charts for clinical trends and longitudinal analytics |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible iconography across all navigation and cards |
| **Typography** | Google Fonts | `Fraunces` (warm display serif), `Inter` (readable UI body), `IBM Plex Mono` (metadata) |
| **Styling** | Semantic Design Tokens | Warm linen/navy design system with strict WCAG contrast compliance |

---

## 📁 Project Structure

```
Memoire/
├── public/
│   ├── favicon.svg             # Application favicon with the Memoire mark
│   └── icons.svg               # SVG icons and symbol definitions
├── src/
│   ├── assets/
│   │   ├── hero.png            # Visual brand hero asset
│   │   ├── react.svg           # React asset
│   │   └── vite.svg            # Vite asset
│   ├── App.css                 # Application-wide utility styles
│   ├── App.jsx                 # Core multi-role application and state architecture
│   ├── index.css               # Global baseline typography, reset & theme styling
│   └── main.jsx                # Application root mounting with React.StrictMode
├── index.html                  # HTML5 entry template with viewport configuration
├── package.json                # Project dependencies, scripts, and metadata
├── vite.config.js              # Vite bundler configuration with @vitejs/plugin-react
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aviral-Jain07/Memoire.git
   cd Memoire
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to interact with the application.

### Available Scripts

* `npm run dev`: Runs Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Bundles production-optimized static assets into `dist/`.
* `npm run preview`: Locally previews the production build.
* `npm run lint`: Runs ESLint across the codebase.

---

## 🧭 How to Explore the Prototype

When you open Memoire, you can switch between all 4 perspectives at any moment:

1. Click on the **Role Badge** in the top right corner of the navigation bar (e.g. *Ananya Sharma — Caregiver view*).
2. Choose any persona:
   * **Raj Sharma (Patient)**: Try scanning family faces, asking the Memory Companion a question (*"What medicine do I take?"*), or marking today's routine tasks as remembered or needing a reminder.
   * **Ananya Sharma (Caregiver)**: Change the recognition support level from Medium to High, add a new routine activity, or review triage alerts.
   * **Priya Sharma (Family)**: Send a voice note or post a shared memory photo to Raj.
   * **Dr. Sharma (Doctor)**: View the longitudinal recall trend charts across Periods 1, 2, and 3, inspect question clustering patterns, and click **Generate Assessment Report**.

---

## 🗺️ Roadmap & Future Enhancements

* [ ] **Wearable & Smart Home Integration**: Sync with smartwatches and home sensors for automatic activity detection, step logging, and sleep quality correlation.
* [ ] **Voice-First Interaction (STT / TTS)**: Native hands-free speech recognition and warm voice synthesis tailored for senior patients with tremors or vision challenges.
* [ ] **Computer Vision Camera Recognition**: Integration with on-device camera feeds to automatically identify approaching visitors and gently whisper/display their identity.
* [ ] **FHIR / EHR Interoperability**: Export clinical observations and question frequency trends directly into electronic health record standards (HL7 FHIR) for neurology clinics.
* [ ] **Multi-Language & Dialect Support**: Localized audio prompts and interface translations (Hindi, Spanish, French, and regional dialects).

---

## 🛡️ Privacy & Medical Disclaimer

> **Important**: Memoire is designed as an assistive memory-support tool and care-circle communication companion. It is **not** a diagnostic medical device and does not provide formal medical diagnoses. All metrics, recall observations, and question logs are based on recorded user interactions and self-reporting. Healthcare decisions should always be made in consultation with qualified medical professionals.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
