export const projectsContent: Record<string, string> = {
  'portfolio_ide.md': `# Portfolio IDE
## This website
**Status:** Active
**Year:** 2025
**Type:** Personal Project

---

## Concept

A portfolio site that looks and behaves exactly like a JetBrains IDE.
Because why have a boring portfolio when you can have one that developers
will actually enjoy exploring?

## Features

- Full JetBrains New UI Dark theme (pixel-accurate colours)
- Collapsible file tree with folders for each portfolio section
- Tabbed editor with line numbers and markdown syntax highlighting
- Functional fake bash terminal (\`ls\`, \`cd\`, \`cat\`, \`pwd\`, \`help\`...)
- Resizable sidebar and terminal panels

## Built With

\`Angular 21\` \`TypeScript\` \`SCSS\` \`GitHub Pages\` \`GitHub Actions\`

## Source

github.com/YorkeF/YorkeF.github.io

<!-- Inception: a portfolio project that describes itself -->
`,

  'ecommerce_platform.md': `# E-commerce Platform
## Full-stack marketplace for digital goods
**Status:** Completed
**Year:** 2023
**Type:** Freelance

---

## Overview

Built a complete e-commerce platform for a client selling digital art assets:
brushes, textures, templates. Handles payments, downloads, licences,
and a seller dashboard with real-time analytics.

## Architecture

Frontend (Next.js) → API Gateway → Microservices
                                    ├── Auth Service (JWT + OAuth)
                                    ├── Products (PostgreSQL)
                                    ├── Payments (Stripe)
                                    └── Files (S3 + CloudFront)

## Key Features

- Stripe integration with webhooks for payment verification
- S3 signed URLs for secure downloads (expire after 24h)
- Real-time seller earnings via WebSockets
- Full-text product search with Elasticsearch

## Tech Stack

\`Next.js\` \`TypeScript\` \`PostgreSQL\` \`Redis\` \`Stripe\` \`AWS S3\`
\`CloudFront\` \`Elasticsearch\` \`Docker\` \`Railway\`
`,

  'iot_dashboard.md': `# IoT Data Dashboard
## Real-time analytics for sensor data
**Status:** Open Source
**Year:** 2022
**GitHub:** github.com/YorkeF/iot-dashboard

---

## Overview

A real-time dashboard visualising data from IoT temperature and humidity
sensors across multiple locations. Built for a university lab monitoring
server room conditions — 200+ sensors across 6 floors.

## Features

- Live charts updating every 5 seconds via WebSockets
- Historical data exploration with date range picker
- Threshold alerts (email + Slack notifications)
- Multi-location support with floor plan overlays
- Export to CSV and PDF

## Technical Highlight

The tricky part: handling back-pressure when 200+ sensors fire
simultaneously. Solved with BullMQ queuing and batched DB writes,
reducing database load by **85%** without data loss.

## Tech Stack

\`React\` \`D3.js\` \`Node.js\` \`InfluxDB\` \`BullMQ\` \`Redis\`
\`WebSockets\` \`Docker\` \`Raspberry Pi\`
`
};
