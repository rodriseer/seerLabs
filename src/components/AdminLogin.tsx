"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid password.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface-card p-6 md:p-8 max-w-md mx-auto flex flex-col gap-5"
    >
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2">
          Admin
        </div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
          Sign in to continue.
        </h1>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-ink-muted">Password</span>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="review-input"
        />
      </label>

      {error && (
        <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
