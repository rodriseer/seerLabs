import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";
import { isAdmin, expectedAdminToken } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin | Seer Labs",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = !!expectedAdminToken();

  if (!configured) {
    return (
      <div className="relative min-h-[70vh] flex items-center">
        <div className="max-w-xl mx-auto px-6 lg:px-8 py-20">
          <div className="surface-card p-8 md:p-10">
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-3">
              Admin
            </div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-ink">
              Admin not configured.
            </h1>
            <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed">
              Set the{" "}
              <code className="px-1.5 py-0.5 rounded bg-ink/[0.06] dark:bg-white/[0.08] text-xs">
                ADMIN_PASSWORD
              </code>{" "}
              environment variable (e.g. in{" "}
              <code className="px-1.5 py-0.5 rounded bg-ink/[0.06] dark:bg-white/[0.08] text-xs">
                .env.local
              </code>{" "}
              for dev, or in your hosting provider&apos;s env settings) and
              restart the server to enable admin access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const authed = await isAdmin();

  return (
    <div className="relative">
      <section className="relative pt-32 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {authed ? <AdminDashboard /> : <AdminLogin />}
        </div>
      </section>
    </div>
  );
}
