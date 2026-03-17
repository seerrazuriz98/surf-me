# surf-me

Portfolio-quality surf forecasting app built with Next.js, Tailwind CSS, and Supabase auth/favorites.

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js` + auth helpers)
- Leaflet + Chart.js

## Project structure

- `app/` - Route segments, API route handlers, loading/error boundaries
- `components/` - Reusable UI components (map, cards, charts, auth panel)
- `lib/` - Data sources, Supabase helpers, forecast integration
- `types/` - Shared domain types

## Environment variables

Create a local `.env.local` (see `.env.example`) with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values must also be configured in Vercel Project Settings → **Environment Variables** for Preview and Production.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
```

The production build should pass cleanly before deployment.

## Production deployment (Vercel)

1. Import the repository in Vercel.
2. Add the Supabase environment variables from the section above.
3. Keep default build settings:
   - Build command: `npm run build`
   - Output: Next.js default
4. Deploy.

## Production readiness notes

- API caching is enabled for `/api/forecast` responses (`s-maxage` + `stale-while-revalidate`).
- Error boundaries are configured for global app errors and spot detail route failures.
- SEO metadata is configured at app layout level (Open Graph + Twitter card + robots).
