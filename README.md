# BellaBona — Marketing Site

A bilingual (EN/DE) marketing site for BellaBona built with **Next.js 16 (App Router)**, **Sanity v5** as a headless CMS, and a strictly typed GROQ → TypeScript pipeline. This document captures the key architectural decisions, the trade-offs behind them, and why the current shape of the codebase is the right one for this kind of project.

---

## Repository layout

```
bellabona-test-task/
├── nextjs-bellabona-test-task/   # Frontend (Next.js App Router)
└── studio-bellabona-test-task/   # Sanity Studio (content authoring)
```

Two independent npm projects in one monorepo. The studio owns the schema and is the single source of truth for content shapes; the frontend imports auto-generated types from it. Husky + Prettier are wired at the repo root so both projects share the same formatting and pre-commit hooks.

---

## Content model: blocks, not pages

The home page (and any future landing-type page) is composed from a typed array of **blocks**. Each block is a self-contained Sanity object schema with its own React component and its own GROQ projection branch. Adding a new block is a four-line operation:

1. Define the schema in `studio-bellabona-test-task/schemaTypes/pages/.../blocks/<name>.ts`.
2. Register it in the page's `of: [...]` union.
3. Add the projection branch to `homePageQuery` (`_type == "..." => { ... }`).
4. Add a `case '<name>':` to `BlockRenderer`.

Why this matters:

- **Open/Closed (SOLID)** — `BlockRenderer` is closed to modification but open to extension. New blocks are added without touching existing ones.
- **Single Responsibility** — every block owns its data shape, its rendering, and its styling. No god-component, no leaky abstractions.
- **Reusability** — `splitCtaBlock` already proves the point: the same component renders two visually distinct callouts (light-pink and light-green variants) driven by a CMS field. The same block can be dropped into the About page or the Services page tomorrow with zero extra code.
- **Editor empowerment** — content editors compose pages by adding, removing, and reordering blocks in the Studio. They don't request a developer for every layout change.
- **Type safety end-to-end** — `sanity typegen` emits a discriminated union for every block. `BlockRenderer` narrows on `_type`, so adding an unhandled block is a compile-time error.

Shared atomic objects (`cta`, `seo`, `faq`, `localeString`, `localeText`, `localeRichText`) live alongside `seo` in `schemaTypes/settings/` because they're reused across many block types. Pulling them into a shared location prevents the schema from drifting into duplicated, near-identical fragments.

---

## Site Settings as the global SEO + branding source

`siteSettings` is a Sanity singleton that holds everything that is **global, brand-level, and SEO-critical**: organization name, legal name, description, primary domain, logo, favicon, contact email, and social profiles.

It exists for two reasons:

1. **One place for editors to manage brand identity.** Change the email or add a social link once, see it propagate to header, footer, contact blocks, and JSON-LD.
2. **A single, authoritative source for structured data.** The `Organization` and `WebSite` JSON-LD graphs are built directly from these fields (see `src/seo/jsonld.ts`). This is exactly what schema.org-driven SEO tooling (Google Rich Results, AI search crawlers) expects — a consistent, deduplicated entity referenced via stable `@id`s.

The JSON-LD is emitted in `[locale]/layout.tsx` so every page on the site carries the organization graph automatically. FAQ blocks emit their own `FAQPage` JSON-LD inline — locally scoped because FAQ content is page-specific.

This is the difference between _having_ SEO and _engineering_ SEO: the entire structured-data surface is generated from the CMS, validated by the type system, and updated reactively when content changes.

---

## Rendering strategy: SSG + ISR with tag-based revalidation

The whole site is statically generated at build time (`generateStaticParams` per locale) and revalidated on demand via Sanity webhooks. The flow:

1. Every server fetch is tagged: `sanityFetch({ query, tags: ['homePage'] })`.
2. The webhook target — `app/api/revalidate/route.ts` — verifies the Sanity signature, reads the changed document's `_type`, and calls `revalidateTag(tag)` for the affected tags.
3. The next request gets fresh data; everyone else continues to serve the cached HTML.

Why this beats the alternatives:

- **vs. pure SSR on every request** — orders of magnitude cheaper. Static HTML is served from the edge with no database round-trip and no Sanity API hit. For marketing content that changes maybe a few times a day, paying the SSR cost on every visit is wasteful.
- **vs. pure SSG (rebuild on deploy)** — content editors don't wait for a deploy. Publishing in Sanity invalidates the affected tags within seconds; pages refresh on the next request.
- **vs. time-based ISR** — tag-based invalidation only refetches pages whose data actually changed. A meal edit doesn't blow away the entire site's cache; it only invalidates `meal` + `homePage`. Mapping is explicit in `TYPE_TO_TAGS`.
- **Cost** — pages are served as static assets. Sanity API calls happen only on revalidation, not per visit. This is the sweet spot for a content-driven marketing site: editor velocity of a CMS + cost profile of a static site.

The webhook signature is verified with `@sanity/webhook` and a shared secret. Without a valid signature, the route returns 401 — no cache-busting attack surface.

---

## Internationalization: `next-intl` with locale-prefixed routing

EN is the default and lives at `/`; DE lives at `/de/...`. The site uses `next-intl`'s `defineRouting` with `localePrefix: 'as-needed'` and explicit detection disabled — keeps URLs clean, avoids automatic redirects that surprise crawlers, and gives full control over canonical URLs.

Content is localized at the **field** level via `localeString`, `localeText`, and `localeRichText` object types in Sanity. The `@sanity/language-filter` plugin lets editors toggle which language they are editing — both languages are always saved in the same document, which keeps the structure flat and avoids the duplication problems of document-level i18n.

The `pickLocale()` helper centralizes the read side: it returns the requested locale, falling back to EN to guarantee no empty rendering even on partially translated content.

Language switching is implemented as raw `<a>` tags (not client-side `<Link>`) so search engines see real, crawlable, locale-alternate URLs.

---

## Studio structure and editor experience

Visit `Studio → Content` and you'll see a deliberate hierarchy:

- **Site Settings** and **Header** / **Footer** are pinned singletons at the top — they're configured once.
- **Pages** group routes (Home, etc.).
- **Meals** has its own group with sub-lists for All Meals and Categories — reflecting how editors actually think about that content.
- **Reviews** is its own pinned list.
- Everything else falls through to the default document type list.

SEO state is surfaced directly in document previews: every document with an `seo` field renders `🟢 index · 🟢 follow` (or `🔴` for blocked) in its subtitle, so editors can audit indexability at a glance without opening each document.

---

## Header, sticky behavior, and mobile menu

The header is a sticky element that hides on scroll-down and reveals on scroll-up — a well-known pattern for keeping primary navigation accessible without permanently sacrificing vertical space. When the mobile menu opens, the header is pinned back into view, body scroll is locked, and a portal-rendered overlay covers the viewport from below the header. The implementation specifically guards against the well-known sticky-positioning bug that occurs when scroll-locking the body, and falls back to `position: fixed` only while the menu is open.

---

## Styling: SCSS modules + CSS variables

- **SCSS modules** for component-scoped styles — no class collisions, dead-code removable per component.
- **CSS variables** for the design tokens (colors, typography variables, font family) — runtime theming is possible without a JS framework, and SSR has zero hydration risk from styling.
- **Typography component** is the single source of truth for type styles. Every text node in the codebase flows through it with `variant`, `color`, `weight`, and `font` props. This guarantees visual consistency and makes a global type refresh a one-file change.

---

## Image handling

Every Sanity image is read through the shared `getImageProps()` helper (`src/sanity/sanityImg.ts`), which:

- Applies the Sanity-side crop (`rect=x,y,w,h`) so editor crops actually take effect.
- Maps the hotspot to a CSS `object-position`, so focal points survive responsive resizes.
- Sets `auto=format` and quality defaults for sensible bandwidth.

`<Image fill unoptimized />` is used with the Sanity CDN URL. `unoptimized` is intentional: Sanity's CDN already does on-demand resizing, and bypassing Next's image optimizer preserves the rect/hotspot query string the helper builds. Adding a second optimizer would either strip those params or double-process the asset.

Alt text is **mandatory on every image schema except favicons** — enforced at schema definition time, so editors can't ship an unlabeled image.

---

## Forms: react-hook-form + zod

Two interactive forms exist on the home page: the quote calculator and the contact form. Both use `react-hook-form` for state and `zod` for validation. The error copy is hard-coded (per project requirement) rather than CMS-managed — error messages are tied to validation logic and don't need editorial control.

The quote calculator has its formulas and ranges extracted into a `constants.ts` file so business inputs (meal price range, participation rate, employee bounds) can be tuned without touching component logic.

---

## What is intentionally not built

- **No live preview overlay** in the frontend. `next-sanity`'s `defineLive` is wired only for tag-aware fetching; the visible `SanityLive` component was removed because the project doesn't need real-time editor preview yet. If/when it does, it's a one-line addition.
- **No backend for forms.** Submissions `console.log` for now; wiring a real endpoint is a focused future task.
- **No analytics yet.** Adding GTM/Plausible is a layout-level concern and can be done independently of the content model.

---

## TL;DR

A static-first site with a tag-revalidated cache, a strictly typed block system, a CMS-driven structured-data graph, and an i18n model that doesn't lie to search engines. The architecture is built to **stay cheap, stay fast, and stay editable** as the project grows.
