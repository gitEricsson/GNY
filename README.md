# Gloria & Young HR Consulting Ltd (Website)

Production web platform for Gloria & Young HR Consulting Ltd — built to showcase services, values, leadership, and client testimonials through a modern, highly animated, interactive user experience.

## Overview

This is a **Next.js App Router** project built with:

- **Next.js 16** + **React 18**
- **Tailwind CSS v4** (via `@import 'tailwindcss'`)
- **shadcn/ui** primitives (Radix UI)
- **Framer Motion** for motion design
- **Matter.js** for physics-based interactivity

The codebase is intentionally UX-forward: layered backgrounds, scroll-linked motion, micro-interactions, and rich layout components are first-class.

## Key Features

### Product & Content Features

- **Service catalogue + detail pages**

  - Service cards on the homepage link to dedicated pages under `app/services/[slug]`.
  - Pages are statically generated using `generateStaticParams()`.
  - Each service includes structured content (overview, pitch, approach blocks, CTA) and icon mapping.

- **About page** (`app/about/page.tsx`)

  - Long-form brand story, values framework, and founder/leadership spotlight.
  - Includes parallax imagery and kinetic UI elements.

- **Testimonials** (`components/testimonials.tsx`)

  - Mobile-friendly carousel behavior.
  - Desktop scroll-reveal cards + kinetic gear SVG animation.
  - “Glass” card styling variants to match the brand aesthetic.

- **Contact form with hosted form provider** (`components/contact.tsx`)
  - Client-side validation.
  - Loading / success / error states.
  - Sends submissions to **Formspree** (or any similar provider) via an environment-configured endpoint.

### Interaction & Motion Design

- **Loading experience** (`components/loading-screen.tsx`)

  - Controlled in `app/layout.tsx` with a `LoadingContext` to coordinate “enter” animations.

- **Hero section motion** (`components/hero.tsx`)

  - Typewriter headline effect.
  - Animated counters for key stats.

- **Services hover micro-interactions** (`components/services.tsx`)

  - Liquid fill card hover feel.
  - "Learn more" arrow bounce animation (CSS keyframes in `app/globals.css`).

- **Physics-driven About section** (`components/about.tsx`)

  - Matter.js-based layout with dynamic bodies and boundaries.
  - Runs when the section is visible to avoid unnecessary work.

- **Scroll-linked components**
  - `components/scroll-fill-text.tsx`: text fill reveal driven by scroll progress.
  - `components/scrolling-text.tsx`: animated marquee with a circular “lens” mask.

### Navigation & Layout

- **Sticky global navigation** (`components/navigation.tsx`, `components/global-header.tsx`)

  - Desktop + mobile responsive menu.
  - CTA button links to `#contact`.

- **Footer with quick links + socials** (`components/footer.tsx`)
  - Includes WhatsApp link.
  - Dynamic services list (slug generation for service routes).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 18, Tailwind CSS v4, shadcn/ui (Radix UI)
- **Animation**: Framer Motion
- **Physics**: Matter.js
- **Icons**: lucide-react
- **Forms**: hosted endpoint (Formspree recommended)

## Project Structure

```text
GNY/
  app/
    layout.tsx                # Root layout, LoadingContext, global header/footer
    globals.css               # Global styles + Tailwind imports + CSS keyframes
    page.tsx                  # Homepage composition
    about/page.tsx            # About page
    services/[slug]/
      page.tsx                # Service route + static params
      service-client.tsx      # Animated service page UI

  components/
    hero.tsx
    services.tsx
    about.tsx
    testimonials.tsx
    values.tsx
    contact.tsx
    navigation.tsx
    global-header.tsx
    footer.tsx
    loading-screen.tsx
    scroll-fill-text.tsx
    scrolling-text.tsx

  public/                     # Images, icons, brand assets
  styles/globals.css           # Legacy/optional (not used by App Router)
```

## Getting Started

### Prerequisites

- Node.js **18+**
- npm

### Install

```bash
npm install
```

### Environment Variables

Create/update `.env`:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/<your_form_id>
```

Notes:

- This endpoint is read in `components/contact.tsx`.
- After changing `.env`, **restart** the dev server.

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build / Run production

```bash
npm run build
npm run start
```

<!-- ## Deployment Notes (Namecheap)

Namecheap hosting varies by plan:

- **If you have Node.js hosting (cPanel / VPS / Dedicated):**

  - Run `npm install` and `npm run build` on the server.
  - Start the server with `npm run start`.
  - Ensure your environment variable `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is set.

- **If you only have static hosting:**
  - Next.js App Router is not purely static by default.
  - You would need a static export strategy and adjust config accordingly.
  - If you tell me your exact Namecheap plan, I can recommend the cleanest deployment path.

## Configuration Notes

- `next.config.mjs` has:
  - `typescript.ignoreBuildErrors = true` (build won’t fail on TS errors)
  - `images.unoptimized = true` (avoids Next Image optimization pipeline) -->

## Customization Guide

- **Brand colors / tokens**: `app/globals.css` (`:root` CSS variables)
- **Services content**: `app/services/[slug]/page.tsx` (`servicesData`)
- **Homepage section order**: `app/page.tsx`
- **Logos & images**: `public/` (and referenced paths in components)

## Troubleshooting

- **Contact form says “not configured”**

  - Ensure `.env` contains `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=...` and restart the dev server.

- **Formspree submission fails**

  - Confirm the Formspree form is active and accepts JSON.
  - Check the browser Network tab for the response body.

- **TypeScript errors not blocking builds**
  - This is expected due to `typescript.ignoreBuildErrors` in `next.config.mjs`.
  - For stricter CI, remove that flag and address TS errors.

## Contact

Gloria & Young HR Consulting Ltd

- **Email**: info@gloriaandyounghrconsulting.org
- **Phone**: +234 707 874 4141
- **WhatsApp**: +234 707 874 4141
