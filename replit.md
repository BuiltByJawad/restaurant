# FoodFlow — Bangladesh Restaurant SaaS Platform

## Project Overview

FoodFlow is a multi-tenant SaaS platform for restaurants in Bangladesh. It enables restaurant owners to launch an online ordering storefront, manage menus and orders, view analytics, and lets Super Admins manage tenants, subscriptions, and platform-wide metrics.

**Status:** Fully wired. All dashboard pages (overview, orders, menu, analytics, customers, settings) and all admin pages (overview, restaurants, subscriptions) connect to real PostgreSQL data via API routes. Auth (login/register) uses JWT + Zustand persistence. No dummy data used anywhere in authenticated flows.

## Tech Stack

| Layer | Technology |
|---|---|
| App | Next.js 15 App Router |
| Backend API | Next.js Route Handlers |
| Database | PostgreSQL + Prisma ORM (Replit built-in DB) |
| Auth | bcryptjs password hashing + JWT (JWT_SECRET env var) |
| Styling | Tailwind CSS v4 |
| Forms | react-hook-form + zod |
| State | Zustand cart store with localStorage persistence |
| Charts | Recharts |
| Icons | Lucide React |
| Payments | SSLCommerz, bKash, Nagad, Rocket, Cash on Delivery data model/routes |

## Design System

- Primary color: `#0A7A5A`
- Accent color: `#F59E0B`
- Currency: BDT `৳`
- Phone format: `01XXXXXXXXX`
- Cities: Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal
- Required form fields should not use asterisks; show inline red validation messages below inputs.

## Important Files

- `web/prisma/schema.prisma` — active Prisma schema used by the app.
- `web/prisma/seed.ts` — seed data for demo restaurants, menus, customers, orders, plans, and users.
- `web/lib/prisma.ts` — Prisma singleton client.
- `web/lib/backend.ts` — shared mappers and backend data operations.
- `web/lib/api-utils.ts` — API response and request parsing helpers.
- `web/app/api/**/route.ts` — backend API routes.
- `web/store/cart.ts` — client-only Zustand cart store with explicit hydration.
- `web/components/dashboard/sidebar.tsx` and `web/components/dashboard/admin-sidebar.tsx` — responsive dashboard/admin navigation.
- `web/next.config.ts` — Next.js config with Replit preview domain allowlist and outputFileTracingRoot set.

## Environment Variables

| Key | Purpose |
|---|---|
| `DATABASE_URL` | Replit built-in PostgreSQL connection string (auto-set) |
| `JWT_SECRET` | Secret for signing JWTs (set via Replit secrets) |

## API Routes

| Route | Purpose |
|---|---|
| `GET /api/health` | Database health check |
| `POST /api/auth/register` | Create restaurant owner + restaurant trial account |
| `POST /api/auth/login` | Email/password login and JWT response |
| `GET/POST /api/restaurants` | List/create restaurants |
| `GET/PUT /api/restaurants/[slug]` | Read/update restaurant by slug |
| `GET/POST /api/restaurants/[slug]/menu` | Read menu or add menu item |
| `GET/POST /api/orders` | List orders or create guest order |
| `GET/PATCH /api/orders/[id]` | Read/update order by id or order number |
| `GET /api/dashboard/overview` | Restaurant dashboard overview data |
| `GET /api/admin/overview` | Platform overview data |
| `GET /api/admin/restaurants` | Admin restaurant list |
| `GET /api/admin/subscriptions` | Admin subscription list |
| `GET/PUT /api/settings/restaurant` | Restaurant settings read/update |

## Demo Data

- Admin email: `admin@foodflow.com.bd`
- Demo password for seeded users: `foodflow123`
- Main demo restaurant slug: `dhaka-biryani-house`
- Run seed: `cd web && npm run db:seed`

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Marketing landing page |
| `/auth/login` | Login form |
| `/auth/register` | Multi-step registration |
| `/[slug]` | Database-backed restaurant storefront |
| `/[slug]/checkout` | Checkout that posts real orders to `/api/orders` |
| `/[slug]/order/[id]` | Database-backed order tracking |
| `/dashboard` | Restaurant owner overview |
| `/dashboard/orders` | Order management |
| `/dashboard/menu` | Menu management |
| `/dashboard/analytics` | Revenue and customer insights |
| `/dashboard/customers` | Customer list |
| `/dashboard/settings` | Restaurant profile/settings |
| `/admin` | Super admin overview |
| `/admin/restaurants` | Tenant management |
| `/admin/subscriptions` | Subscription management |

## Development Notes

- Dev server runs on port `5000`, host `0.0.0.0`.
- `allowedDevOrigins` is configured for Replit preview domains.
- `outputFileTracingRoot` set to `/home/runner/workspace` to silence lockfile warning.
- Prisma version is pinned to `6.19.0` because Prisma 7 changes schema/config behavior.
- Run database setup from `web/`: `npx prisma generate`, `npx prisma db push`, `npm run db:seed`.
- The dashboard/admin desktop sidebars collapse to fixed bottom navigation on mobile.
- Restart the app after backend or dependency changes and verify runtime logs rather than relying on TypeScript checks.
