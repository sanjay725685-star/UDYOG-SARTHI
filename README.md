# 🇮🇳 UDYOG SARTHI (उद्योग सारथी)
### *From Application to Approval — One Intelligent Regulatory Journey*

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026_Prototype-FF9933?style=for-the-badge&logo=gov.in&logoColor=white)](https://github.com)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-DAG_Topology-ff0072?style=for-the-badge&logo=react)](https://reactflow.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 📌 About UDYOG SARTHI

**UDYOG SARTHI** is an AI-Powered Industrial Approval & Compliance Coordination Platform built for **Smart India Hackathon 2026**. 

Inspired by India’s single-window ecosystems—**National Single Window System (NSWS)**, **Maharashtra MAITRI**, and **MIDC Single Window Clearance**—UDYOG SARTHI introduces an original, intelligent coordination layer that solves industrial clearance fragmentation, opaque dependencies, repetitive document submissions, and compliance delays.

### 🏭 The Problem It Solves
- **Opaque Dependencies:** Entrepreneurs apply for factory licenses without knowing they strictly require prior pollution consent (MPCB CTE) and Fire NOC.
- **Repeated Submissions:** Common entity proofs (PAN, GSTIN, land allotment deeds) are uploaded repeatedly across 6+ disparate portals.
- **Avoidable Query Delays:** Document calculation errors or missing layout drawings are caught only after a 30-day queue wait, resetting statutory review clocks.
- **Department Overburden:** Officers spend 45% of their time verifying routine text fields rather than technical risk evaluation.

---

## ✨ Key Features & Capabilities

1. **AI Approval Discovery:** Analyzes project capex, workforce, connected load, effluent discharge, and boiler specs to generate an exact list of statutory clearances with AI reasoning and statutory disclaimers.
2. **Interactive React Flow DAG:** Directed Acyclic Graph visually mapping prerequisite $\rightarrow$ dependent relationships with node status states (*Completed, In Progress, Blocked, Action Required*). Click any node to see *"Why is this blocked?"*.
3. **AI Document Pre-Audit & OCR:** Drag-and-drop animated laser OCR scanner that extracts parameters, cross-checks GSTIN/PAN, and detects formula gaps (e.g., ETP hydraulic flow retention) before officer submission.
4. **Critical Path & Bottleneck Intelligence:** NetworkX-style graph analysis identifying downstream cascading risks and what-if delay simulators calculating idle carrying costs.
5. **Workflow Orchestration (9 Milestones):** Step-by-step lifecycle from entity registration to tamper-evident digital clearance certificate.
6. **4 Role-Based Workspaces (RBAC):**
   - 🏢 **Entrepreneur / Business:** Applications, documents, query responses, certificates.
   - 👮 **Department Officer (MPCB SRO):** Scrutiny queue, AI review assistant, query desk, sanction order.
   - 🏛️ **Nodal Officer (Single Window Authority):** Inter-departmental SLA tracking, citizen charter escalations.
   - ⚙️ **System Administrator:** Declarative regulatory rules engine, audit logs, and security controls.
7. **Official Digital Sanction Order:** Generates printable government-style certificates with QR code verification and digital cryptographic signature (DSC) hash.

---

## 🚀 Pre-Populated Demonstration Case

The platform comes pre-seeded with a realistic industrial scenario for instant evaluation:
- **Enterprise:** *ABC Manufacturing Pvt Ltd* (Director: Rajesh Verma)
- **Project:** *Electric Vehicle Components Manufacturing Unit, MIDC Chakan Phase II, Pune, Maharashtra*
- **Capital Outlay:** ₹25 Crore | **Workforce:** 250 employees | **Power:** 1,200 kVA | **Effluent:** Orange Category
- **8 Clearances Modeled:** MIDC Land Allotment, Building Plan Sanction, Provisional Fire NOC, MPCB Consent to Establish (CTE), MSEDCL High Tension Power, MIDC Water Works, DISH Factory License, Boiler Registration.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Interactive Graph:** `@xyflow/react` (React Flow)
- **AI Simulation:** Multi-pass OCR layout extraction, rule-based mismatch validation, automated scoring
- **Security:** RS256 JWT, RBAC matrix, AES-256 data isolation, SHA-256 audit logging
- **Integrations:** API-ready adapter architecture for NSWS, MAITRI, and NIC SMS/Email webhooks

---

## 🏁 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/udyog-sarthi.git
cd udyog-sarthi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [**http://localhost:3005**](http://localhost:3005) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🧭 20-Step End-to-End Clickable Flow

Use the **floating Hackathon Tour Bar** at the bottom of the screen:
$$\text{Landing Page} \rightarrow \text{Register Business} \rightarrow \text{Project Profiling} \rightarrow \text{AI Approval Discovery} \rightarrow \text{Dependency Graph} \rightarrow \text{Document Checklist} \rightarrow \text{AI Pre-Audit Scanner} \rightarrow \text{Submit Dossier} \rightarrow \text{Entrepreneur Dashboard} \rightarrow \text{Application Deep-Dive} \rightarrow \text{Officer Queue} \rightarrow \text{AI Review Assistant} \rightarrow \text{Officer Raises Query} \rightarrow \text{Applicant Notification} \rightarrow \text{Upload Query Response} \rightarrow \text{AI Re-Audit} \rightarrow \text{Officer Approves} \rightarrow \text{Digital Sanction Certificate} \rightarrow \text{Admin Rules Engine} \rightarrow \text{Analytics BI}$$

---

## ⚖️ Statutory Disclaimer

*UDYOG SARTHI is a prototype demonstration developed for **Smart India Hackathon 2026**. It is not an official portal of the Government of India or the Government of Maharashtra. All final approvals remain the statutory prerogative of authorized government officers.*

---

## 👥 Team & License
- Developed for **Smart India Hackathon 2026**
- Licensed under the [MIT License](LICENSE).
