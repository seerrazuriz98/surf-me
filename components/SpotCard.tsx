import Link from "next/link";
import type { SurfSpot } from "@/types/surf";

interface SpotCardProps {
  spot: SurfSpot;
}

export function SpotCard({ spot }: SpotCardProps) {
  return (
    <article className="glass-card rounded-2xl p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">{spot.name}</h2>
        <span className="rounded-full bg-cyan-100/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          {spot.difficulty}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-700">{spot.country}</p>
      <Link
        href={`/spots/${spot.id}`}
        className="mt-6 inline-flex items-center rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
      >
        View forecast
      </Link>
    </article>
  );
}
