# Agents

## Project summary
- React 19 + Vite + TanStack Start/Router app.
- TypeScript, Tailwind CSS, and Shadcn UI.
- Drizzle ORM with PostgreSQL, Better Auth.

## Repo layout
- `src/` app source code
- `src/routes/` file-based routes (TanStack Router)
- `public/` static assets

## Common commands
- `pnpm dev` start dev server on port 3000
- `pnpm build` production build
- `pnpm preview` preview build
- `pnpm test` run Vitest
- `pnpm lint` Biome lint
- `pnpm format` Biome format
- `pnpm check` Biome lint + format

## Database (Drizzle)
- `pnpm db:generate` generate migrations
- `pnpm db:migrate` run migrations
- `pnpm db:push` push schema
- `pnpm db:pull` introspect DB
- `pnpm db:studio` open Drizzle Studio

## Auth
- `pnpm auth:secret` generate Better Auth secret
- Uses environment variables in `.env`

## Conventions
- Keep route files in `src/routes` (file-based routing).
- Prefer TanStack Router loaders for route data fetching.
- Use Tailwind utilities for styling; Shadcn UI for components.
- Run `pnpm check` before PRs when feasible.
