import Link from "next/link";
import type { SurfSpot } from "@/types/surf";

interface SpotCardProps {
  spot: SurfSpot;
}

export function SpotCard({ spot }: SpotCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">{spot.name}</h2>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          {spot.difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{spot.region}</p>
      <p className="mt-3 text-sm text-slate-700">
        Best swell: <strong>{spot.bestSwell}</strong>
      </p>
      <Link
        href={`/spots/${spot.id}`}
        className="mt-4 inline-flex text-sm font-medium text-cyan-700 hover:text-cyan-900"
      >
        View spot details →
      </Link>
    </article>
  );
}
