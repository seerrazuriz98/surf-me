import Link from "next/link";
import { AuthPanel } from "@/components/AuthPanel";
import { SurfMapShell } from "@/components/surf-map-shell";
import { SpotCard } from "@/components/SpotCard";
import { getSurfSpots } from "@/lib/surf-data";

export default function HomePage() {
  const spots = getSurfSpots();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="glass-card mb-10 overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 sm:text-sm">surf-me</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Ride smarter with a modern surf forecast dashboard
            </h1>
            <p className="mt-4 text-sm text-slate-700 sm:text-base">
              Track the best breaks, inspect conditions, and save your next sessions with a calm ocean-inspired experience built for mobile and desktop.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <Link href="/favorites" className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800">
              Go to favorites
            </Link>
            <Link
              href="/spots/pichilemu-punta-de-lobos"
              className="rounded-xl border border-cyan-700/50 bg-white/60 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-white"
            >
              Explore a forecast
            </Link>
          </div>
        </div>
      </header>

      <AuthPanel />

      <SurfMapShell />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </section>
    </main>
  );
}
