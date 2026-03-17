import Link from "next/link";
import { notFound } from "next/navigation";
import { ForecastList } from "@/components/forecast-list";
import { getSurfSpotById, getSurfSpots, getWaveForecastBySpotId } from "@/lib/surf-data";

interface SpotDetailPageProps {
  params: Promise<{
    spotId: string;
  }>;
}

export function generateStaticParams() {
  return getSurfSpots().map((spot) => ({ spotId: spot.id }));
}

export default async function SpotDetailPage({ params }: SpotDetailPageProps) {
  const { spotId } = await params;
  const spot = getSurfSpotById(spotId);

  if (!spot) {
    notFound();
  }
  const forecast = getWaveForecastBySpotId(spot.id);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm font-medium text-cyan-700 hover:text-cyan-900">
        ← Back to all spots
      </Link>

      <header className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.15em] text-slate-500">{spot.country}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{spot.name}</h1>
        <p className="mt-2 text-slate-700">{spot.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
          <span className="rounded-full bg-slate-100 px-3 py-1">Difficulty: {spot.difficulty}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Coordinates: {spot.latitude}, {spot.longitude}
          </span>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Wave forecast</h2>
        <ForecastList forecast={forecast} />
      </section>
    </main>
  );
}
