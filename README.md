# SWI Firefly Memory

**Development status: SUSPENDED / RESEARCH DEMO**

Persistent-memory *prototype* related to Structured Workflow Intelligence (SWI).

```text
NAMED ≠ IMPLEMENTED ≠ TESTED ≠ PROVEN ≠ SEALED ≠ AUTHORIZED ≠ PRODUCTION_AUTHORIZED
Authentication ≠ Authorization
CI_GREEN ≠ SWI_AUTHORIZED
```

| Ceiling | Value |
|---------|--------|
| PROVEN | **NO** |
| SEALED | **NO** |
| AUTHORIZED | **NO** |
| PRODUCTION_AUTHORIZED | **NO** |

Do **not** treat this repository as a production memory engine, a sealed system, or proof of SWI governance.

---

## What is actually in this repository

Public tree is largely **flat** TypeScript/React sources at the root (for example `server.ts`, dashboard components, `package.json`).  
The earlier monorepo layout (`apps/`, `packages/`, multi-package CLI, Docker production guides) described in older materials is **not** present as a complete implemented tree on `main`.

Observed capabilities (implementation depth varies):

- Express `server.ts` with demo routes (including OTP request/verify and simulated replay import)
- React/Vite UI surfaces for maze / SEAM / dashboard experiments
- SMTP credentials expected from **environment variables** (must not be hardcoded)

Security branch work (not necessarily on `main`):

- `security/firefly-credential-hardening-2026-10-29` — remove hardcoded SMTP fallbacks; OTP success must **not** set `replay_permission: true`

---

## Non-claims

This repository does **not** establish:

- Production readiness or “Production v1.0”
- That the system is “proven”
- 90%+ test coverage as an achieved result (that was a **target**, not a measured outcome published here)
- Complete apps/packages architecture as shipped code
- Cryptographic sealing of SWI as a whole
- That OTP verification grants SWI governing authorization or production authority

---

## Local development (when dependencies install)

```bash
git clone https://github.com/Kelronmos/swi-firefly-memory.git
cd swi-firefly-memory
npm install
# Copy .env.example → .env and set SMTP_* only if testing email paths
npm run dev   # if defined in package.json
npm run lint  # tsc --noEmit
```

OTP boundary unit-style tests (on security branch):

```bash
node --test tests/otp_authorization_boundary.test.mjs
```

---

## License

MIT © Keletso Ronald Mosidila

---

**Discipline:** True state > green status. Suspended development is not failure of honesty; overclaiming is.
