# AI URL Shortener (Phase 1)

This repository is an AI-powered URL shortener. Phase 1 sets up the backend foundation: TypeScript + Express + MongoDB, configuration, middleware, health route, and graceful shutdown.

Quick start (development):

```bash
cp .env.example .env
npm install
npm run dev
```

Health check:

```bash
curl http://localhost:3000/health
```
