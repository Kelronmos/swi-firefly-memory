# SWI Firefly Memory
Development suspended 
Persistent Memory Engine for Structured Workflow Intelligence (SWI)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Overview

Firefly Memory is a robust, AI-safe cognitive memory engine designed for autonomous AI workflows. It provides verified memory storage with cryptographic integrity, transaction receipts, audit trails, and comprehensive governance features to ensure reliable memory management in production AI systems.

**Status**: Production v1.0 (Deterministic Memory Runtime)

## Core Features

✓ **Deterministic Memory Engine** - Atomic memory operations with guaranteed state  
✓ **Receipt Generation** - Cryptographic proof of all memory transactions  
✓ **Memory Replay** - Reconstruct past states and verify execution flow  
✓ **Verification System** - Hash verification and integrity validation  
✓ **Governance Layer** - Runtime binding and policy enforcement  
✓ **Evidence Engine** - Complete audit trail and exportable proof  
✓ **Portable Format** - `.firefly` packages for import/export  
✓ **Recovery** - Disaster recovery without UI dependency  
✓ **SEAM Monitor** - System execution awareness and transparency  
✓ **Security Maze** - Multi-layer security validation  

## Architecture

```
┌──────────────────────────────────────────────────┐
│      User Interfaces (Dashboard + SEAM)           │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│        SWI API Gateway (REST/gRPC)                │
├──────────────────────────────────────────────────┤
│ Governance → Runtime Binding → Security Maze     │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│      Firefly Memory Core Engine                   │
├──────────────────────────────────────────────────┤
│ ├─ Memory Atoms (with ID, Hash, Signature)      │
│ ├─ Receipt Generator                             │
│ ├─ Replay Service                                │
│ ├─ Evidence Engine                               │
│ └─ Trust Scoring                                 │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│    Persistent Storage Layer                       │
├──────────────────────────────────────────────────┤
│ ├─ Encrypted Local Store (AES-256-GCM)          │
│ ├─ SQLite Metadata Database                      │
│ ├─ Backup & Archive System                       │
│ └─ Recovery Mechanisms                           │
└──────────────────────────────────────────────────┘
```

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 18+ with TypeScript execution
- **API**: Express.js + REST endpoints
- **Frontend**: React + Vite (optional; system works without UI)
- **Database**: SQLite (local) + encrypted filesystem storage
- **Security**: Ed25519 signatures, AES-256-GCM encryption, JWT
- **Testing**: Jest + 90%+ coverage target
- **CI/CD**: GitHub Actions with automated security scans
- **Monitoring**: SEAM (System Execution Awareness Monitor)

## Project Structure

```
swi-firefly-memory/
├── apps/
│   ├── cli/                    CLI (UI-independent)
│   └── api/                    REST API server
│
├── packages/
│   ├── core/
│   │   ├── memory-engine/      Memory atom storage
│   │   ├── context-engine/     Context extraction
│   │   ├── semantic-compression/ Semantic encoding
│   │   └── graph-engine/       Memory relationship graphs
│   │
│   ├── storage/
│   │   ├── local-store/        Encrypted filesystem
│   │   ├── encrypted-store/    AES-256-GCM wrapper
│   │   └── backup-store/       Backup and recovery
│   │
│   ├── firefly-format/
│   │   ├── encoder/            .firefly serialization
│   │   ├── decoder/            .firefly deserialization
│   │   └── schema/             Version-controlled schema
│   │
│   ├── security/
│   │   ├── identity/           Owner/actor verification
│   │   ├── authority/          Authorization levels
│   │   └── encryption/         AES-256, Ed25519
│   │
│   ├── governance/
│   │   └── policy-engine/      Runtime policy validation
│   │
│   ├── evidence/
│   │   ├── receipts/           Receipt generation
│   │   ├── pdf-generator/      Evidence export
│   │   └── replay/             State reconstruction
│   │
│   └── seam/
│       ├── event-stream/       Execution events
│       ├── visualizer/         SEAM display logic
│       ├── halt-engine/        Pause & validate
│       └── timeline/           Event timeline
│
├── cli/                         Command-line interface
├── examples/                    Working example scripts
├── docs/                        Comprehensive documentation
├── tests/                       Test suites (unit, integration, e2e)
├── scripts/                     Build and utility scripts
├── docker/                      Docker configuration
└── deployment/                  Production deployment guides
```

## Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/Kelronmos/swi-firefly-memory.git
cd swi-firefly-memory

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Initialize storage
npm run init
```

### CLI Usage (No UI Required)

```bash
# Initialize firefly storage
npm run cli -- init

# Create memory from text
npm run cli -- import document.txt

# Export portable memory package
npm run cli -- export --format firefly --output backup.firefly

# Restore from package
npm run cli -- restore backup.firefly

# Verify memory integrity
npm run cli -- verify memory-id

# Show execution timeline
npm run cli -- replay memory-id

# Generate investor demo
npm run cli -- demo
```

### API Server

```bash
# Start API server
npm run server

# Server runs on http://localhost:3000
# Health check: GET /health
# Metrics: GET /metrics
```

### SEAM Monitor (System Execution Awareness)

```bash
# Start with SEAM enabled
npm run start:seam

# Access at http://localhost:3000/seam
# Toggle: CTRL+SHIFT+S in normal dashboard
```

## Development

```bash
# Run tests
npm run test

# Tests with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch

# Lint code
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Build
npm run build

# Build Docker image
npm run docker:build
```

## Production Features

### Memory Lifecycle

Every memory atom includes:

```typescript
{
  id: string;                    // Unique memory ID
  sessionId: string;             // Workflow session
  workflowId: string;            // Workflow reference
  fireflyId: string;             // Firefly instance ID
  createdAt: ISO8601;            // Creation timestamp
  updatedAt: ISO8601;            // Last update
  expiresAt?: ISO8601;           // Human-like forgetting
  confidence: number;            // Trust score (0-1)
  importance: number;            // Relevance weight
  origin: string;                // Data source
  signature: string;             // Ed25519 signature
  hash: string;                  // SHA256 hash
  receipt: ReceiptId;            // Transaction proof
  status: MemoryStatus;          // Current state
}
```

### Portable Format (.firefly)

Export/import encrypted memory packages:

```json
{
  "firefly_version": "1.0",
  "identity": {
    "owner_hash": "USR-A91F"
  },
  "memory_atoms": [
    {
      "id": "MEM-001",
      "concept": "software_architecture",
      "weight": 0.92,
      "context": ["engineering", "swi"],
      "authority": "owner"
    }
  ],
  "relations": [
    {
      "from": "MEM-001",
      "to": "MEM-009",
      "type": "association"
    }
  ],
  "security": {
    "encrypted": true,
    "signature": "..."
  },
  "evidence": {
    "created": "2026-07-08T14:17:00Z",
    "runtime": "swi-1.0"
  }
}
```

### Disaster Recovery

System survives without UI:

```
UI DOWN
  ↓
CLI ACCESS (always available)
  ↓
.firefly Files (encrypted, portable)
  ↓
Restore Memory
  ↓
Continue Operation
```

### SEAM Monitor (Transparency)

Execution X-ray showing every decision:

```
┌─────────────────────────────────┐
│      SWI SEAM HALT              │
│       ⛔ HALTED                  │
├─────────────────────────────────┤
│ Reason:                         │
│ Context confidence below 98%    │
├─────────────────────────────────┤
│ REQUEST        ✓ ID: REQ-88291  │
│ IDENTITY       ✓ Verified       │
│ AUTHORITY      ✓ Level 5        │
│ GOVERNANCE     ✓ Approved       │
│ RUNTIME        ✓ Trusted        │
│ SECURITY MAZE  ✓ Validated      │
│ FIREFLY        ⚠ Awaiting...    │
├─────────────────────────────────┤
│ [ APPROVE ] [ CLARIFY ] [ DENY] │
└─────────────────────────────────┘
```

## API Endpoints

### Memory Management

```http
POST   /api/v1/memory              Create memory
GET    /api/v1/memory/:id          Retrieve memory
PUT    /api/v1/memory/:id          Update memory
DELETE /api/v1/memory/:id          Delete memory
GET    /api/v1/memory/search       Search memories
GET    /api/v1/memory/:id/history  Get version history
GET    /api/v1/memory/:id/replay   Replay memory state
```

### Evidence & Verification

```http
GET    /api/v1/receipts            List receipts
GET    /api/v1/receipts/:id        Get receipt
GET    /api/v1/evidence            Query evidence
POST   /api/v1/verify              Verify memory hash
GET    /api/v1/verification/:id    Get verification report
```

### Import/Export

```http
POST   /api/v1/import              Import .firefly package
POST   /api/v1/export              Export memory package
POST   /api/v1/restore             Restore from backup
GET    /api/v1/backup/status       Backup status
```

### System

```http
GET    /health                     Health check
GET    /ready                      Readiness probe
GET    /live                       Liveness probe
GET    /metrics                    Prometheus metrics
GET    /seam/events                SEAM event stream
```

## Security

### Encryption

- **Data at Rest**: AES-256-GCM
- **Signatures**: Ed25519
- **Key Derivation**: PBKDF2
- **Transport**: TLS 1.3+

### Access Control

- **Identity**: Owner hash verification
- **Authority**: Multi-level (admin, operator, viewer)
- **Governance**: Policy-based validation
- **Runtime Binding**: Trusted execution environment

### Audit Trail

Every operation recorded:
- CREATE, READ, UPDATE, DELETE
- IMPORT, EXPORT, RESTORE
- VERIFY, REPLAY
- All mapped to Evidence IDs

## Testing

Target: **90%+ code coverage**

```bash
npm run test:all       # Full test suite
npm run test:unit      # Unit tests
npm run test:integration # Integration tests
npm run test:security  # Security tests
npm run test:encryption # Encryption validation
npm run test:replay    # Replay verification
npm run test:recovery  # Disaster recovery
```

## Monitoring & Observability

### Health Endpoints

```bash
GET /health            # Overall health
GET /ready             # Readiness for traffic
GET /live              # Liveness signal
GET /metrics           # Prometheus metrics
```

### Structured Logging

```json
{
  "timestamp": "2026-07-08T14:17:00.000Z",
  "level": "info",
  "service": "firefly-memory",
  "workflowId": "WF-001",
  "memoryId": "MEM-A91F",
  "event": "memory_stored",
  "duration_ms": 45,
  "status": "success",
  "receiptId": "RCP-99281"
}
```

## Docker

```bash
# Build image
docker build -t swi-firefly-memory:latest .

# Run container
docker run -p 3000:3000 -v firefly-data:/data swi-firefly-memory:latest

# Docker Compose
docker-compose up
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and components
- [API Reference](docs/API.md) - Complete endpoint documentation
- [Memory Lifecycle](docs/MEMORY.md) - Memory states and transitions
- [Receipts & Evidence](docs/EVIDENCE.md) - Verification and proof
- [Replay Engine](docs/REPLAY.md) - State reconstruction
- [Governance](docs/GOVERNANCE.md) - Policy and access control
- [Security](SECURITY.md) - Encryption and vulnerability reporting
- [Deployment](docs/DEPLOYMENT.md) - Production setup
- [Examples](examples/) - Working code samples

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Roadmap

### v1.0 (Current)
- [x] Deterministic memory engine
- [x] Receipt generation
- [x] Replay capability
- [x] Verification system
- [x] Governance layer
- [x] REST API
- [x] SEAM monitor
- [x] Portable format
- [x] Disaster recovery

### v1.1
- [ ] Memory compression
- [ ] Incremental snapshots
- [ ] Advanced trust scoring
- [ ] Batch evidence export

### v1.2
- [ ] Distributed memory
- [ ] Multi-node sync
- [ ] Conflict resolution
- [ ] Replication

### v2.0
- [ ] Multi-agent shared memory
- [ ] Cross-agent governance
- [ ] Federated verification
- [ ] Autonomous lifecycle

## License

MIT © 2026 Keletso Ronald Mosidila

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issues](https://github.com/Kelronmos/swi-firefly-memory/issues)
- 💬 [Discussions](https://github.com/Kelronmos/swi-firefly-memory/discussions)
- 🔒 [Security](SECURITY.md)

---

**SWI Firefly Memory: Deterministic. Auditable. Portable. Proven.**
