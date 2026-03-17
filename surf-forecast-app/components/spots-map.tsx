import type { SurfSpot } from "@/types/surf";

interface SpotsMapProps {
  spots: SurfSpot[];
}

export function SpotsMap({ spots }: SpotsMapProps) {
  return (
    <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Surf spots map</h2>
      <p className="mt-2 text-sm text-slate-600">
        Coordinate-based preview for quickly exploring breaks.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <div key={spot.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{spot.name}</p>
            <p>
              {spot.coordinates.lat}, {spot.coordinates.lng}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
