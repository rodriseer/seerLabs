# Seer Labs — Client-Focus Restructure Plan

A plan to refocus the site around **building custom software for clients**, with past projects positioned as proof of capability. Seer Labs products are demoted to a secondary "Labs" area. Built around the choices made on 2026-04-19: services-first positioning, 3–5 client projects with detail pages, homepage led by an explicit service offer and featured case studies.

---

## 1. Positioning: services first, portfolio as proof

This is the central framing decision driving everything else.

The site is **not** a portfolio that happens to take inquiries. It is a **services site** — Rodrigo builds custom software for businesses — that uses past client work as evidence of capability. Same projects, different lens.

Practical implications of this framing:
- A first-time visitor learns *what Rodrigo does for clients* in the first sentence of the homepage, not by inferring it from project tiles.
- Service categories are stated explicitly (booking systems, business websites, internal tools, etc.) so prospects can self-identify before they scroll.
- Each case study is told from the client's problem-side, not from the build-side. The frame is *"a business needed X, here's how I solved it for them"* — not *"here's a cool thing I made."*
- Every project page ends in a CTA that funnels back to a sales conversation: *"Have a similar problem? Tell me about it."*
- Process is visible: there's a clear "how we'll work together" explanation so a prospect knows what an engagement looks like before they email.
- CTAs are concrete and offer-oriented (*"Get a free quote"*, *"Tell me what you're building"*) rather than vague (*"Start a project"*).

A visitor should be able to answer three questions within 30 seconds of landing:
1. What does this person build?
2. Has he done it before, for real businesses?
3. How do I get him to do it for me?

---

## 2. Goal

Make the site read, on first impression, as **"Rodrigo Seer builds custom software for businesses — here's the proof."** Future clients should land, understand the offer, see real outcomes that resemble what they need, and feel confident asking for a quote.

Success looks like:
- A client visiting the homepage understands the service offer in the hero, then sees featured client work as proof.
- Service categories are explicit on the homepage (and on a dedicated services area), so prospects know whether they fit.
- Each featured project has its own page deep enough to support a buying decision (client's problem, approach, stack, outcome) and ends in a sales CTA.
- A "how we'll work together" explanation is visible, so prospects know what an engagement involves.
- Products still exist on the site (so they aren't lost work) but live in a clearly secondary "Labs" area and never compete for attention.

---

## 3. Information architecture changes

### Current structure
- `/` — homepage (4 explore cards weighted equally: Products, Client work, How I build, About)
- `/products` + `/products/{campseer,cycleseer,surfseer}`
- `/client-work` (single page, 3 inline projects, no detail pages)
- `/how-i-build`
- `/about`
- `/contact`
- `/reviews`
- `/admin`, `/api` (internal)

### Proposed structure
- `/` — homepage, leads with the service offer + featured client projects
- `/services` — explicit list of what Rodrigo builds for clients (booking systems, business websites, internal tools, etc.) with sub-sections per category. *Optional but recommended — gives prospects a self-service way to confirm fit.*
- `/work` — main client portfolio index *(rename from `/client-work` — shorter, more conventional, but optional)*
- `/work/[slug]` — per-project case study pages (one per client)
- `/how-we-work` — replaces or augments `/how-i-build` — describes the engagement model (intake → quote → phased delivery → handoff) from the *client's* perspective
- `/labs` — new home for Seer Labs products *(SurfSeer, CampSeer, CycleSeer)*
  - `/labs/{campseer,cycleseer,surfseer}` — existing product pages move here
- `/about`, `/contact`, `/reviews` — unchanged
- `/admin`, `/api` — unchanged

> Note: `/how-i-build` exists today and is more craft/process focused. It can either become `/how-we-work` (reframed for clients) or stay as a separate, deeper page for technically curious visitors while `/how-we-work` covers the engagement basics.

> Decision point: keep `/client-work` for SEO continuity, or rename to `/work`. If renaming, set up a 301 redirect in `next.config.ts`. Same applies to `/products` → `/labs`.

### Nav order change
Current nav order likely puts Products first or equally. New order, prioritizing the service offer:
**Services · Work · How we work · Labs · About · Contact**

---

## 4. Per-project detail pages

This is the biggest content lift. Each of the 3–5 projects needs a structured case study at `/work/[slug]`.

### Suggested page template
Every section is written from the client's problem-side, not the build-side. The reader should feel *"this is exactly the kind of problem I have."*

1. **Hero**: client name, project title, one-line outcome stated as a *business result* ("Cut booking back-and-forth by handling 100% of rentals online"), hero image.
2. **The problem**: 1–2 paragraphs about what the client's business needed and why off-the-shelf tools weren't enough. Lead with the client, not the tech.
3. **At a glance**: 4–6 chips — role, timeline, stack, deliverables.
4. **The approach**: how Rodrigo scoped, designed, and built it. Decisions made and trade-offs — framed as *"here's how I think about problems like this,"* so prospects with similar problems see the thinking they'd get.
5. **What I built**: feature list with screenshots / short clips. Each feature framed as a capability the client now has, not just code that exists.
6. **Outcome**: concrete numbers if possible (bookings, conversion lift, time saved). If no metrics yet, use qualitative client quotes.
7. **Stack & infra**: small block at the bottom — kept short, this is reassurance not the main story.
8. **CTA**: services-oriented — *"Have a similar problem? Tell me about your project"* with a primary button to `/contact` (with the project pre-filled in the subject) and a secondary link to the next case study. Every project page is a funnel back to a sales conversation.

### Data model
Move the project data out of `page.tsx`. Two reasonable options:

- **Option A — TS data file** (`src/lib/projects.ts`): one typed array of project objects, each with all template fields. Build the index page and `[slug]` page from this. Simplest, no new dependencies.
- **Option B — MDX content** (`content/work/*.mdx`): each project is a markdown file with frontmatter + free-form body. More flexible for long-form writing, but requires adding `@next/mdx` or `contentlayer`.

> Recommendation: **Option A** for now. You already have 3 short, structured project entries. MDX is overkill until you're writing 800+ word case studies.

### Project pages to create
Based on what's already in code:
- `/work/365-events-and-rentals`
- `/work/clickond`
- `/work/sidea`
- `/work/[slug-4]`, `/work/[slug-5]` — placeholders for the next 1–2 you mentioned

---

## 5. Homepage redesign

The current homepage hero is generic and the "guided tour" gives Products and Client work equal weight. The new homepage explicitly states the offer first, then proves it with client work, then explains the engagement, then closes.

1. **Hero — the offer** *(rewritten)*. Headline names the service and the audience: *"I build custom software for businesses that need it built right."* Subhead lists what *kind* of software (booking systems, business websites, internal tools, custom apps). Primary CTA *Get a free quote*, secondary *See client work*. A visitor who reads only the hero already knows what you do and how to engage you.
2. **What I build** *(NEW)* — a short strip listing 3–5 service categories with a one-line description each (e.g. *Reservation & booking systems*, *Bilingual business websites*, *Internal tools & desktop apps*, *Conversion-focused marketing sites*). Each links to either `/services#category` or to a representative case study. This is what lets a prospect self-identify in seconds.
3. **Featured client projects** *(NEW, replaces "guided tour")* — 2–3 large cards pulled from the same projects data, each linking to its `/work/[slug]` page. Tile layout with image, client name, the *business outcome* as the headline (not the project name), and tags.
4. **The way I work** *(KEEP, recontextualized)* — the three principles section, but framed as *"what working with me feels like."* It already reads like a services pitch.
5. **How we'll work together** *(NEW)* — short 3–4 step strip: *Tell me about your project → Free quote and scope → Phased build with weekly updates → Handoff and support.* This removes the "what does hiring this guy actually involve?" friction.
6. **Labs strip** *(NEW, demotes products)* — a single, smaller strip linking to `/labs` with one-line description. Keeps products discoverable without competing for attention.
7. **Start a project CTA** *(KEEP, copy refresh)* — the dark panel. Update headline and button to match the new offer-oriented copy (see CTA guidance below).

---

## 6. Component changes

Mostly reuse, some renames, two new pieces:

- **Reuse**: `Hero`, `SectionHeader`, `AnimateIn`, `ProjectCard`, `CTASection`, `Footer`, `Nav`.
- **Rename / refactor**: `ProductCard` stays for `/labs`; `ProjectCard` should be enhanced to support a "featured" variant for the homepage tiles.
- **New**: `ServicesStrip.tsx` (the "What I build" homepage section), `FeaturedProjects.tsx` (homepage projects section), `EngagementSteps.tsx` (the "How we'll work together" section), `CaseStudyLayout.tsx` (per-project page template), `ProjectMeta.tsx` ("at a glance" chips block).

No design system overhaul needed — the existing tokens (`ink`, `ink-muted`, `bg`, `surface`, `premium-card`, etc.) carry over.

---

## 7. CTA copy guidance

CTAs are where the services framing pays off. Across the site, replace ambiguous portfolio-style CTAs with concrete, offer-oriented language. Suggestions:

- *"Start a project"* → *"Get a free quote"* (primary, on the homepage hero and CTA panel)
- *"Start a project"* (case study end) → *"Have a similar problem? Tell me about your project"*
- *"See client work"* (secondary) → keep as-is, it works
- *"Contact"* (nav) → keep as-is for nav, but the page itself should lead with *"Tell me what you're building"* not just a generic form
- *Hero subhead phrasing*: prefer the second-person — *"need a booking system, business site, or internal tool? I build them."* — over third-person portfolio language
- *Email subject lines* in `mailto:` links should pre-fill something useful (*"Project inquiry — [page name]"*) so inbound triages itself

Rule of thumb: every button on the site should answer the question *"what happens if I click this?"* in plain language. *"Start a project"* doesn't — *"Get a free quote"* does.

---

## 8. Content you'll need to gather

Per project, before the detail page can ship:
- 2–4 high-quality screenshots or short screen recordings.
- A clear one-line outcome.
- A 2–3 sentence problem statement (preferably in the client's own words).
- The stack and any infra decisions worth calling out.
- Permission to name the client (already implied since they're public, but worth confirming).
- Optional: a short quote from the client.

This is usually the bottleneck on case-study pages — worth starting now in parallel with the build.

---

## 9. SEO and redirect notes

- If `/client-work` → `/work` rename happens, add `redirects()` in `next.config.ts` mapping old paths to new ones.
- Each `/work/[slug]` page needs its own `generateMetadata` with title, description, and OG image (the project hero image).
- Add a `sitemap.ts` if not present — Next 14+ supports this natively.
- Update `robots.ts` to allow `/work` and `/work/*`.

---

## 10. Suggested phasing

A way to ship this in three chunks instead of one big rewrite. The phases now front-load the *messaging* changes (which are mostly copy, not code) so the services framing is visible as soon as possible.

**Phase 1 — Reframe and restructure (1 sitting)**
- Rewrite homepage hero copy around the explicit service offer.
- Add "What I build" services strip and "How we'll work together" engagement strip on the homepage.
- Replace "guided tour" with "Featured projects" using the existing 3 projects.
- Update CTA copy site-wide per Section 7.
- Move products to `/labs` (or keep `/products` and just renumber nav).
- Update nav order.
- Demote products to a single strip on the homepage.

**Phase 2 — Detail pages scaffolding (1 sitting)**
- Extract project data into `src/lib/projects.ts`.
- Build `CaseStudyLayout` component using the client-problem-first template (Section 4).
- Stand up `/work/[slug]` route with the existing 3 projects, even if content is thin.
- Add the closing "Have a similar problem?" CTA on every project page.
- Add metadata + redirects.

**Phase 3 — Content fill and services page (ongoing)**
- For each project, replace the thin scaffold with real case-study content as you collect screenshots, quotes, and metrics.
- Add the 4th and 5th projects when ready.
- Optionally build out a full `/services` page with one section per service category.

---

## 11. Open questions

Things to decide before Phase 1:
1. Rename `/client-work` to `/work` and `/products` to `/labs`, or keep current URLs?
2. Are all 5 projects shippable publicly, or are some under NDA?
3. Should the homepage feature all projects or only a curated 2–3 with the rest on `/work`?
4. Do you want a testimonial/reviews block on the homepage too, pulling from the existing `/reviews` data?
5. Do you want a standalone `/services` page in Phase 1, or is the homepage "What I build" strip enough until later?
6. Keep `/how-i-build` as a deeper craft page, or fold it into a new client-facing `/how-we-work`?
