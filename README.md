# GigFlow

Modern full‑stack marketplace for posting gigs, bidding, and hiring — with realtime notifications, secure auth, and a polished UI.

![Node](https://img.shields.io/badge/Node-18%2B-339933) ![React](https://img.shields.io/badge/React-19-61DAFB) ![Vite](https://img.shields.io/badge/Vite-7-646CFF) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Express](https://img.shields.io/badge/Express-5-black) ![MongoDB](https://img.shields.io/badge/MongoDB-9-brightgreen) ![Socket.io](https://img.shields.io/badge/Socket.io-4-black)

---

## Overview

GitFlow enables clients to post gigs, freelancers to bid, and owners to hire — all backed by secure cookies and realtime Socket.io updates. The app ships with a clean React + Tailwind UI, global notifications, and a developer‑friendly structure.

### Highlights
- Authentication with HTTP‑only JWT cookies
- Post, edit, delete gigs; browse and search with status chips
- Bid flow with owner guardrails (no self‑bidding) and unique constraints
- Hiring flow that auto‑rejects other bids and updates gig status
- Realtime notifications for hire and new bids (global toasts + header bell)
- Dashboard with derived stats and recent activity
- Secure server defaults: Helmet, CORS, rate limiting, robust error handling

---

## Tech Stack

- Client: React + TypeScript, Vite, Tailwind CSS, socket.io‑client, React Router
- Server: Node.js, Express 5, Mongoose, Socket.io, Helmet, CORS, express‑rate‑limit
- Database: MongoDB

---

## Monorepo Layout

```
GitFlow/
├─ client/            # React app (Vite + Tailwind)
│  ├─ src/
│  │  ├─ components/  # UI components (Header, Footer, AuthModal, etc.)
│  │  ├─ context/     # AuthContext, SocketContext (global notifications)
│  │  ├─ pages/       # Feature pages (Dashboard, BrowseGigs, GigDetails...)
│  │  ├─ sections/    # Landing page sections
│  │  ├─ config/      # axios config, API endpoints, Vite proxy
│  │  └─ utils/       # HTTP helpers
│  └─ vite.config.ts  # Dev proxy /api → server
└─ server/            # Express API + Socket.io
   └─ src/
      ├─ models/      # User, Gig, Bid, Profile
      ├─ services/    # Business logic (auth, gigs, bids, dashboard)
      ├─ controllers/ # HTTP controllers
      ├─ routes/      # /api/health, /auth, /gigs, /bids, /profile, /dashboard
      ├─ middlewares/ # auth, error, logger, security
      ├─ sockets/     # io.js (rooms, CORS, lifecycle logs)
      ├─ utils/       # jwt, password, DB connection, health
      ├─ validators/  # request validation
      ├─ app.js       # middleware pipeline
      └─ server.js    # bootstrap + graceful shutdown
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1) Install dependencies
```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

### 2) Configure environment
Create `server/.env`:
```
PORT=5000
MONGODB_URL=mongodb://localhost:27017/GitFlow
JWT_SECRET=change_me_in_production
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000
NODE_ENV=development
```
Optionally, create `client/.env` if API is on a different origin:
```
VITE_API_URL=https://api.example.com
VITE_SOCKET_URL=https://api.example.com
```
In local dev, the client uses Vite proxy and sockets default to `http://localhost:5000`.

### 3) Run in development
```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```
Dev server: http://localhost:5173  
API + sockets: http://localhost:5000 (proxied under /api from the client)

---

## Production

Recommended: same‑origin deploy (serve the client and API under one domain).

1) Build client
```bash
cd client
npm run build
# outputs client/dist
```

2) Configure server env
```
NODE_ENV=production
PORT=5000
MONGODB_URL=...
JWT_SECRET=...
ALLOWED_ORIGINS=https://yourdomain.com
```
Use HTTPS so secure cookies are sent.

3) Start server
```bash
cd server
npm start
# or: node src/server.js / PM2 / systemd
```

4) Serve client build
Serve `client/dist` via your web server/CDN (NGINX, CloudFront, etc.).  
If using split origins, set `VITE_API_URL`/`VITE_SOCKET_URL` and include the frontend domain in `ALLOWED_ORIGINS`.

---

## Features in Detail

### Auth
- JWT stored as HTTP‑only cookie
- `GET /api/auth/me` hydrates client on load
- Login/Register/Logout endpoints with server‑side validation

### Gigs
- CRUD for gigs with owner checks
- Text search and status filters
- Bid count derivation for cards and lists

### Bids
- Create bid with unique (gigId, freelancerId) constraint
- Owner cannot bid on own gig
- Hire flow:
  - Selected bid → `hired`, other bids → `rejected`
  - Gig status → `assigned`
  - Notifications emitted to freelancer and owner rooms

### Realtime Notifications
- Socket rooms: `user:{userId}`
- Events:
  - `hire` — when owner hires a bid
  - `bid` — when a new bid is placed (emitted to owner)
- Global UI:
  - Toasts (top‑right) for instant feedback
  - Header `NotificationBell` for recent notifications (non‑persistent, stored in context)
  - Actions: mark all read, clear, per‑item dismiss

---

## API Overview

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`
- Gigs: `GET /api/gigs`, `GET /api/gigs/:id`, `GET /api/gigs/my-gigs`, `POST /api/gigs`, `PUT /api/gigs/:id`, `DELETE /api/gigs/:id`
- Bids: `GET /api/gigs/:id/bids`, `POST /api/gigs/:id/bids`, `GET /api/bids/my-bids`, `POST /api/bids/:id/hire`
- Profile: `GET/PUT /api/profile`
- Dashboard: `GET /api/dashboard`
- Health: `GET /api/health`

---

## Security & Ops

- Cookies: `httpOnly`, `secure` in production, `sameSite=strict`
- CORS: explicit `ALLOWED_ORIGINS` with credentials
- Middleware: Helmet (CSP disabled for dev), rate limit, structured errors
- DB: Mongoose models with indexes (title text index, unique bid index)
- Logging: request logs, socket connect/disconnect, emission logs on hire

---

## Development Notes

- Client dev uses Vite proxy for `/api` → `http://localhost:5000`
- Sockets:
  - Dev default connects to `http://localhost:5000`
  - Production default connects to `window.location.origin` unless `VITE_SOCKET_URL` is set
- Global notifications are in `SocketContext` (up to 20 entries, in memory)

---

## Scripts

### Client
- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript build + Vite build
- `npm run preview` — preview built client
- `npm run lint` — lint client sources

### Server
- `npm run dev` — nodemon dev server
- `npm start` — run server
- `npm run migrate` — run migration script
- `npm run seed` — run seed script

---

## License

Proprietary. All rights reserved. Update if you intend to open source.
