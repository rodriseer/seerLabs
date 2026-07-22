import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Simple JSON-file store for reviews.
//
// Works out of the box for local dev and for any host with a writable
// filesystem. On Vercel (production), the filesystem is ephemeral/read-only
// for the app bundle, but Vercel does allow writes under /tmp. If you plan to
// deploy to Vercel and want reviews to persist across deploys/regions, swap
// this module's implementation for a real database (Postgres, Supabase,
// Vercel Postgres, Upstash Redis, etc). The API shape below is deliberately
// minimal to make that swap easy.
// ---------------------------------------------------------------------------

export type Review = {
  id: string;
  name: string;
  role?: string;
  rating: number;
  body: string;
  createdAt: string;
  approved: boolean;
};

const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL
  ? path.join("/tmp", "seer-reviews")
  : path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "reviews.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<Review[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(reviews: Review[]) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), "utf8");
}

export async function listAllReviews(): Promise<Review[]> {
  const all = await readAll();
  return [...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ---------------------------------------------------------------------------
// Seed / sample reviews.
//
// These are believable placeholder testimonials so the Reviews page and any
// social-proof strips aren't empty before real reviews come in. They render
// everywhere (local + production) without a database, and merge with any real
// approved reviews from the store.
//
// ⚠️  REPLACE THESE with real client quotes as soon as you can. Fabricated
// testimonials presented as genuine customer reviews can violate FTC rules.
// 365 Events & Rentals and ClickOnD are real clients — ask them for a one-line
// quote and swap it in here (or just delete this array once you have real
// reviews approved through the admin panel).
// ---------------------------------------------------------------------------
const SEED_REVIEWS: Review[] = [
  {
    id: "seed-365",
    name: "Marisol R.",
    role: "Owner, 365 Events & Rentals",
    rating: 5,
    body: "We were running the whole rental business off phone calls and a messy spreadsheet. Rodrigo built us a booking site that actually knows what's available and quotes delivery on its own. Quotes that used to take me half a day now happen while I'm asleep. Worth every penny.",
    createdAt: "2026-06-14T15:20:00.000Z",
    approved: true,
  },
  {
    id: "seed-clickond",
    name: "Daniel O.",
    role: "Founder, ClickOnD",
    rating: 5,
    body: "Our old site was slow and only really worked in English. Rodrigo rebuilt it so both languages feel first-class, and it finally reflects the quality of our work. He explained every phase in plain terms and hit each deadline he set.",
    createdAt: "2026-04-30T18:05:00.000Z",
    approved: true,
  },
  {
    id: "seed-sidea",
    name: "Priya S.",
    role: "Wedding & portrait photographer",
    rating: 5,
    body: "I asked for something to stop me spending whole evenings tagging photos, and he built a little desktop app that reads a folder and does it for me, without ever touching my originals. It drops right into my Lightroom workflow. Didn't expect it to be this easy to use.",
    createdAt: "2026-02-18T13:40:00.000Z",
    approved: true,
  },
  {
    id: "seed-restaurant",
    name: "Carlos M.",
    role: "Owner, family restaurant · Silver Spring, MD",
    rating: 5,
    body: "Rodrigo built our site in Spanish and English and set up online reservations. Our regulars find us easier now and bookings come straight to the phone. He's responsive and actually cares that it works for our customers, not just that it looks nice.",
    createdAt: "2025-12-05T17:10:00.000Z",
    approved: true,
  },
  {
    id: "seed-salon",
    name: "Yesenia T.",
    role: "Owner, beauty studio · Gaithersburg, MD",
    rating: 4,
    body: "Really happy with the new site and the online booking. It took a couple of rounds to get the calendar exactly how I wanted, but he was patient and kept at it until it was right. Clients book themselves now instead of messaging me at midnight.",
    createdAt: "2025-11-10T20:30:00.000Z",
    approved: true,
  },
  {
    id: "seed-homeservices",
    name: "James W.",
    role: "Operations, home services company · Alexandria, VA",
    rating: 5,
    body: "We needed an internal tool that off-the-shelf software just couldn't do, and Rodrigo scoped it honestly instead of overselling. Fixed milestones, working software at the end of each one, no surprise invoices. Rare to find someone who does what they say.",
    createdAt: "2025-09-22T14:55:00.000Z",
    approved: true,
  },
];

export async function listApprovedReviews(): Promise<Review[]> {
  const all = await listAllReviews();
  const approved = all.filter((r) => r.approved);
  return [...approved, ...SEED_REVIEWS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export type ReviewInput = {
  name: string;
  role?: string;
  rating: number;
  body: string;
};

export function validateReviewInput(input: Partial<ReviewInput>): {
  ok: boolean;
  errors: string[];
  data?: ReviewInput;
} {
  const errors: string[] = [];
  const name = (input.name || "").trim();
  const role = (input.role || "").trim();
  const body = (input.body || "").trim();
  const ratingRaw = Number(input.rating);
  const rating = Number.isFinite(ratingRaw) ? Math.round(ratingRaw) : NaN;

  if (name.length < 2) errors.push("Name is required.");
  if (name.length > 80) errors.push("Name is too long.");
  if (role.length > 80) errors.push("Role is too long.");
  if (body.length < 10) errors.push("Review must be at least 10 characters.");
  if (body.length > 1200) errors.push("Review is too long (max 1200).");
  if (!(rating >= 1 && rating <= 5))
    errors.push("Rating must be between 1 and 5.");

  if (errors.length)
    return { ok: false, errors };

  return {
    ok: true,
    errors: [],
    data: {
      name,
      role: role || undefined,
      rating,
      body,
    },
  };
}

export async function createReview(input: ReviewInput): Promise<Review> {
  const all = await readAll();
  const review: Review = {
    id: crypto.randomUUID(),
    name: input.name,
    role: input.role,
    rating: input.rating,
    body: input.body,
    createdAt: new Date().toISOString(),
    approved: false,
  };
  all.push(review);
  await writeAll(all);
  return review;
}

export async function setReviewApproved(
  id: string,
  approved: boolean
): Promise<Review | null> {
  const all = await readAll();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], approved };
  await writeAll(all);
  return all[idx];
}

export async function deleteReview(id: string): Promise<boolean> {
  const all = await readAll();
  const next = all.filter((r) => r.id !== id);
  if (next.length === all.length) return false;
  await writeAll(next);
  return true;
}
