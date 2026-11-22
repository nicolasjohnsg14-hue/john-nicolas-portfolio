# John Michael Nicolas — Portfolio

A personal portfolio for a Quality Assurance Engineer, built with Next.js, TypeScript and Tailwind CSS.

## Running locally

```bash
bun install     # or: npm install
bun run dev     # http://localhost:3004
```

Production build:

```bash
bun run build
bun run start
```

## Editing content

All page content lives in a single file: [`data/profile.ts`](data/profile.ts). Update the name, summary, skills, experience, projects, education and contact details there — the sections render from it, so no component changes are needed.

## CV download

The "Download CV" buttons link to `public/cv.pdf`. That file is generated from the CV content by:

```bash
bun run cv      # writes public/cv.pdf
```

Replace `public/cv.pdf` with your own exported PDF if you prefer to serve your original CV file.

## Structure

```
app/            layout, page and global styles
components/     one component per section, plus header, footer and reveal
data/profile.ts all site content
public/cv.pdf   downloadable CV
scripts/        CV PDF generator
```

## Deployment

This is a static Next.js site with no database, API routes or environment variables. Any Next.js-capable host works:

- **Vercel** — import the repository, framework preset is detected automatically, no configuration needed.
- **Netlify** — build command `next build`, publish directory `.next` (use the official Next.js runtime).
- **Cloudflare (Workers)** — run `npx @opennextjs/cloudflare build` and deploy the generated Worker if you want it on Cloudflare.
- **Any Node host** — `bun run build && bun run start` behind a reverse proxy.

Before publishing, update `data/profile.ts` with your final contact details and make sure `public/cv.pdf` is the CV you want public.
