import type { Metadata } from "next";
import { AnimateIn } from "@/components/AnimateIn";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { SectionHeader } from "@/components/SectionHeader";
import { listApprovedReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews | Seer Labs",
  description:
    "What clients and collaborators say about working with Rodrigo Seer and Seer Labs.",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await listApprovedReviews();
  const hasReviews = reviews.length > 0;

  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            as="h1"
            eyebrow="Reviews"
            title={hasReviews ? "What people say." : "Leave a review."}
            description={
              hasReviews
                ? "Client feedback and collaborator notes. Every review here is someone I've actually built something with."
                : "If we've worked together, I'd love to hear how it went. Your note helps future clients know what to expect."
            }
          />
        </div>
      </section>

      {hasReviews && (
        <>
          <section className="relative pb-16 md:pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {reviews.map((r, i) => (
                  <AnimateIn key={r.id} delay={i * 70}>
                    <ReviewCard review={r} />
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          <div className="section-divider max-w-6xl mx-auto" />
        </>
      )}

      <section className="relative py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <ReviewForm />
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
