import type { Review } from "@/lib/reviews";

type Props = {
  review: Pick<Review, "name" | "role" | "rating" | "body" | "createdAt">;
};

export function ReviewCard({ review }: Props) {
  return (
    <article className="surface-card p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < review.rating ? "currentColor" : "none"}
            className={
              i < review.rating
                ? "text-amber-500 dark:text-amber-400"
                : "text-ink-muted/40"
            }
          >
            <path
              d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.77l-5.9 3.1L7.23 14.1 2.45 9.44l6.6-.96L12 2.5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>

      <p className="text-base md:text-lg text-ink/90 leading-relaxed">
        &ldquo;{review.body}&rdquo;
      </p>

      <div className="mt-6 pt-5 border-t border-ink/[0.08] dark:border-white/[0.08]">
        <div className="text-sm font-semibold text-ink">{review.name}</div>
        {review.role && (
          <div className="text-xs text-ink-muted mt-0.5">{review.role}</div>
        )}
      </div>
    </article>
  );
}
