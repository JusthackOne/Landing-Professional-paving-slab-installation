# Plitka Landing Blueprint

Simple Next.js App Router template for a landing page with:

- Tailwind CSS
- shadcn/ui base components
- SCSS global theme layer
- Axios client setup
- SEO baseline (metadata, Open Graph, robots, sitemap)
- ESLint as formatter (Prettier-style rules via ESLint)
- MCP defaults for Next.js/Tailwind/shadcn in Codex

## Requirements

- Bun `1.3.11+` (primary package manager/runtime)

## Run

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

- `bun run lint` - lint checks
- `bun run lint:fix` - auto-fix lint + formatting
- `bun run build` - static export build (`out/`)

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_LEAD_ENDPOINT=https://your-lead-endpoint.example.com/webhook
```

`NEXT_PUBLIC_LEAD_ENDPOINT` should point to an external form handler (for example, your own endpoint that sends email via Resend).

## Static Deployment

Project is configured with `output: 'export'`. After `bun run build`, upload the `out/` directory to static hosting.

## Structure

- `src/app/page.tsx`: landing blueprint sections
- `src/app/layout.tsx`: global metadata and layout shell
- `src/app/robots.ts`: robots.txt generator
- `src/app/sitemap.ts`: sitemap.xml generator
- `src/components/ui/*`: shadcn-style UI primitives
- `src/lib/api-client.ts`: axios instance
- `.codex/config.toml`: project-scoped MCP server config

## MCP

Configured servers:

- `next-devtools`
- `tailwindcss`
- `shadcn`
- `bun`
- `eslint`
