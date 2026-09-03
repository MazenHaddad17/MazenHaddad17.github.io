# Mazen Haddad Portfolio

A personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local development

1. Install dependencies with `npm ci`.
2. Start the development server with `npm run dev`.
3. Create a production build with `npm run build`.
4. Run the type-check and production build together with `npm run check`.

## Static assets

`Portfolio.pdf` is referenced through Vite's asset pipeline, so it is copied to the production build with a cache-safe URL. Keep the file at the project root unless the source code is updated to use a new location.

## Deployment

The default Vite base path is `/`, which is suitable for deployment at a domain root. For a subpath deployment, set `VITE_BASE_URL` to the public subpath including leading and trailing slashes, for example `/portfolio/`, before building.

Configure production hosting with HTTPS and suitable security headers. When the public domain is available, add canonical and social-preview URL metadata.
