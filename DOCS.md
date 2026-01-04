# Technical Documentation & Feature Guide

This document provides in-depth technical details about the application's core features, security model, and configuration options.

---

## 🖥️ Dashboard Overview

The dashboard provides a complete CRUD interface for managing blog posts and products. It is designed with a "Dashboard-First" routing approach.

### Key Routes
- **Overview (`/`)**: High-impact landing page with summary metrics, recent activity, and system status.
- **Posts Management (`/dashboard/posts`)**: Full CRUD operations for blog entries.
- **Products Management (`/dashboard/products`)**: Catalog management for digital inventory.

### Core Features
- **Data Table**: Advanced sorting, filtering, and pagination using TanStack Table.
- **Form Validation**: Type-safe forms with `react-hook-form` and `Zod`.
- **Server Actions**: All mutations happen via secure, type-safe server functions.
- **Glassmorphism UI**: Modern aesthetic with backdrop-blur effects and mesh gradients.

---

## 👤 Anonymous Posts Mode

The dashboard supports an **Anonymous Mode** allowing content management without mandatory authentication.

### How It Works
When `ALLOW_ANONYMOUS_POSTS="true"` is set in your environment:
1. ✅ Anyone can create posts (attributed to "Anonymous User").
2. ✅ Anyone can edit or delete existing posts.
3. ✅ Common for demos, prototypes, and local development.

### Security Configurations
| Mode | `ALLOW_ANONYMOUS_POSTS` | `REQUIRE_AUTH` | Access Level |
|------|-------------------------|----------------|--------------|
| **Anonymous** | `true` | `false` | Full public access for CRUD |
| **Hybrid** | `false` | `false` | Public Read, Auth required for Write |
| **Protected** | `false` | `true` | Full Login required for all dashboard access |

> [!WARNING]
> Anonymous Mode is **NOT** recommended for public production environments.

---

## 🔐 Security Model

### Page Protection
- Dashboard routes check for authentication at the page level.
- Unauthenticated users are redirected to `/login` if `REQUIRE_AUTH="true"`.
- All server actions verify user authorization individually (e.g., users can typically only edit their own posts unless in Anonymous Mode).

### Data Validation
- All inputs are validated using **Zod** schemas.
- **next-safe-action** ensures that all server-side logic handles validation errors gracefully.

---

## 🛠️ Database Schema

The application uses Drizzle ORM with the following core entities:

- **Users**: Authentication and profile data.
- **Posts**: Blog content with title, content, and author relationships.
- **Products**: Digital inventory items with price and description.
- **Sessions/Accounts**: NextAuth managed tables for session persistence.

Refer to `lib/db/schema.ts` for the full implementation.
