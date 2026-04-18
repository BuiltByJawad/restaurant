# FoodFlow — Bangladesh Restaurant SaaS Platform

## Project Overview

FoodFlow is a multi-tenant SaaS platform for restaurants in Bangladesh. It enables restaurant owners to launch an online ordering storefront, manage their menu and orders, and view analytics — all under a custom subdomain. A Super Admin panel manages all tenants, subscriptions, and platform-wide metrics.

**Status:** Frontend (Next.js 15) — Complete. Backend (NestJS) — Schema designed, not yet implemented.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router, Server + Client Components) |
| Styling | Tailwind CSS v4 (CSS-based config, no tailwind.config.js) |
| Forms | react-hook-form + zod (inline red error messages, no asterisks) |
| State | Zustand (cart store with localStorage persistence) |
| Charts | Recharts |
| Icons | Lucide React |
| Font | Plus Jakarta Sans (Google Fonts) |
| Backend (schema only) | NestJS |
| Database | PostgreSQL + Prisma ORM |
| Payments | SSLCommerz sandbox, bKash, Nagad, Rocket, Cash on Delivery |

---

## Design System

- **Primary color:** `#0A7A5A` (emerald green)
- **Accent color:** `#F59E0B` (amber)
- **Currency:** BDT ৳ (Bangladeshi Taka)
- **Phone format:** `01XXXXXXXXX` (11-digit, starts with 01)
- **Cities:** Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal
- **No asterisks on required fields** — inline red validation messages below inputs only

---

## File Structure

```
web/                          # Next.js 15 frontend
├── app/
│   ├── layout.tsx            # Root layout: SEO metadata, fonts, Toaster
│   ├── page.tsx              # Landing page (imports page-content.tsx)
│   ├── page-content.tsx      # "use client" — animated hero, features, pricing, FAQ
│   ├── globals.css           # Tailwind v4 CSS config + design tokens
│   ├── auth/
│   │   ├── login/page.tsx    # Login form with react-hook-form + zod
│   │   └── register/page.tsx # Multi-step registration (restaurant + owner info)
│   ├── [slug]/               # Restaurant storefront (dynamic route)
│   │   ├── page.tsx          # Menu page with category tabs and cart sidebar
│   │   ├── checkout/page.tsx # Checkout with SSLCommerz/bKash/Nagad/Rocket/COD
│   │   └── order/[id]/       # Order tracking with live status updates
│   ├── dashboard/            # Restaurant owner dashboard
│   │   ├── layout.tsx        # Sidebar + topbar wrapper
│   │   ├── page.tsx          # Overview: stats, live orders, popular items
│   │   ├── orders/page.tsx   # Order management with status filters
│   │   ├── menu/page.tsx     # Menu item CRUD with categories
│   │   ├── analytics/page.tsx# Revenue charts, top items, customer insights
│   │   ├── customers/page.tsx# Customer list with order history
│   │   └── settings/page.tsx # Restaurant profile, hours, payments, notifications
│   └── admin/                # Super Admin panel
│       ├── layout.tsx        # Admin sidebar + topbar wrapper
│       ├── page.tsx          # Platform overview: MRR, restaurants, activity feed
│       ├── restaurants/page.tsx # All restaurants with plan/status management
│       └── subscriptions/page.tsx # Subscription plans and billing
├── components/
│   ├── ui/
│   │   ├── button.tsx        # Primary/secondary/outline/ghost variants
│   │   ├── badge.tsx         # OrderStatus/PlanBadge/RestaurantStatusBadge
│   │   ├── form-field.tsx    # FormField, Input, Textarea, SelectField (inline errors)
│   │   ├── switch.tsx        # Toggle switch component
│   │   ├── loading.tsx       # Spinner + skeleton components
│   │   └── toaster.tsx       # Sonner toast wrapper
│   ├── layout/
│   │   ├── navbar.tsx        # Landing page navigation
│   │   └── footer.tsx        # Landing page footer
│   └── dashboard/
│       ├── sidebar.tsx       # Restaurant dashboard sidebar + DashboardTopbar
│       └── admin-sidebar.tsx # Super admin sidebar + AdminTopbar
├── lib/
│   ├── dummy-data.ts         # All mock data: restaurants, menus, orders, customers
│   ├── validations.ts        # Zod schemas for all forms
│   └── utils.ts              # cn, formatCurrency (৳), formatDate, timeAgo, slugify, etc.
├── store/
│   └── cart.ts               # Zustand cart store (persisted to localStorage)
├── next.config.ts            # allowedDevOrigins, image domains, security headers
└── package.json

schema/
└── schema.prisma             # Complete PostgreSQL schema (20+ models)

artifacts/
└── mockup-sandbox/           # Canvas mockup components (design reference)
```

---

## Database Schema (Prisma — `schema/schema.prisma`)

The schema is designed for a multi-tenant SaaS. All tenant data is isolated by `restaurantId`.

### Core Models

| Model | Purpose |
|---|---|
| `User` | Restaurant owners and super admins. Roles: `OWNER`, `STAFF`, `ADMIN` |
| `Restaurant` | Each tenant. Has slug (used as subdomain route), plan, status |
| `Subscription` | Links a restaurant to a plan with billing cycle and dates |
| `SubscriptionPlan` | Platform plans: Starter/Pro/Enterprise with feature flags and price |
| `MenuCategory` | Categories within a restaurant's menu (Biryani, Kebab, Drinks, etc.) |
| `MenuItem` | Individual menu items with price, availability, spice level |
| `MenuItemOptionGroup` | Customization groups (e.g., "Size", "Add-ons") |
| `MenuItemOption` | Individual options within a group with price modifier |
| `Order` | Customer orders with full lifecycle: PENDING → PREPARING → READY → DELIVERED |
| `OrderItem` | Line items within an order, with snapshot of item name/price |
| `Payment` | Payment records. Supports SSLCommerz (val_id, tran_id), bKash, Nagad, Rocket, COD |
| `PromoCode` | Discount codes with type (FLAT/PERCENT), usage limits, and expiry |
| `Review` | Customer reviews tied to order and restaurant |
| `CustomerAddress` | Saved delivery addresses for repeat customers |
| `Notification` | In-app notifications for owners (new order, review, etc.) |
| `AuditLog` | Admin audit trail for all restaurant data changes |
| `RestaurantHours` | Operating hours per day of week |
| `DeliveryZone` | Geographic delivery zones with min order and fee |
| `RestaurantPaymentConfig` | Per-restaurant payment method enablement |

### Key Design Decisions

- **Soft deletes** on MenuItem (isDeleted flag) to preserve order history integrity
- **OrderItem snapshots** store item name/price at time of order (not FK only) to prevent history corruption if menu changes
- **Payment model** includes all SSLCommerz gateway fields: `valId`, `tranId`, `bankTranId`, `cardType`, `storeAmount`, `currency`
- **Multi-payment support** via PaymentMethod enum: `SSLCOMMERZ`, `BKASH`, `NAGAD`, `ROCKET`, `COD`
- **Subscription billing** tracks `currentPeriodStart/End`, `cancelAtPeriodEnd`, and `trialEndDate`
- **RestaurantPaymentConfig** lets each restaurant enable/disable payment methods independently

---

## Pages and Routes

| Route | Description |
|---|---|
| `/` | Marketing landing page with hero, features, testimonials, pricing, FAQ |
| `/auth/login` | Email/password login with inline validation |
| `/auth/register` | Multi-step: restaurant info → owner account |
| `/[slug]` | Restaurant storefront with menu, category tabs, cart |
| `/[slug]/checkout` | Checkout: delivery details, payment method selection |
| `/[slug]/order/[id]` | Order tracking with live status stepper |
| `/dashboard` | Restaurant owner overview (stats, live orders) |
| `/dashboard/orders` | Order management with status filter tabs |
| `/dashboard/menu` | Menu item management with category switching |
| `/dashboard/analytics` | Revenue charts, top-selling items, customer growth |
| `/dashboard/customers` | Customer list with order history and stats |
| `/dashboard/settings` | Restaurant profile, hours, payment config, notifications |
| `/admin` | Super admin overview: MRR, restaurant list, activity feed |
| `/admin/restaurants` | All restaurants, plan management, status control |
| `/admin/subscriptions` | Platform-wide subscription and billing overview |

---

## Bangladesh Localization

- Currency formatted as `৳1,234` (BDT, using the taka sign)
- Phone validation: `^01[3-9]\d{8}$` (11 digits starting with 01)
- City list: Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Mymensingh, Comilla
- Payment methods include bKash, Nagad, Rocket (popular MFS in Bangladesh)
- Restaurant names and customer names use Bangladeshi conventions (Arif, Fatema, Nasir, etc.)
- SSLCommerz used as the primary payment gateway (Bangladesh-native)

---

## Development Notes

- Dev server runs on port 5000, host 0.0.0.0 (required for Replit proxy)
- `allowedDevOrigins` set in next.config.ts for Replit preview domains, including riker/pike cluster hosts
- Demo timestamps use a fixed reference time to avoid server/client hydration drift in the Next.js preview
- Persisted cart state is rehydrated after mount to keep server/client rendering consistent
- Tailwind CSS v4 — configuration is in `globals.css` using `@theme` directive (no tailwind.config.js)
- All forms use react-hook-form + zod. Errors display inline in red below the field. No asterisks.
- `"use client"` required on any component using useState, useEffect, hooks, or browser APIs

---

## Next Steps (Backend — NestJS)

1. Scaffold NestJS project with Prisma integration
2. Implement Auth module (JWT + refresh tokens, bcrypt password hashing)
3. Restaurant module (CRUD, slug generation, plan gating)
4. Menu module (categories, items, options)
5. Order module (state machine: PENDING → PREPARING → READY → OUT_FOR_DELIVERY → DELIVERED)
6. Payment module (SSLCommerz IPN handler, bKash API integration)
7. Admin module (platform analytics, restaurant management)
8. Connect Next.js frontend to backend API (replace dummy data)
