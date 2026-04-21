# E-commerce Platform
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

`Next.js` `TypeScript` `PostgreSQL` `Redis` `Stripe` `AWS S3`
`CloudFront` `Elasticsearch` `Docker` `Railway`
