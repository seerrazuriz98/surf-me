import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ForecastList } from "@/components/forecast-list";
import { getSurfSpotById, getWaveForecastBySpotId } from "@/lib/surf-data";
import type { SurfSpot, WaveForecast } from "@/types/surf";

interface SpotDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

async function getSpotForecast(spot: SurfSpot): Promise<WaveForecast[]> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/forecast?lat=${spot.latitude}&lon=${spot.longitude}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return getWaveForecastBySpotId(spot.id);
  }

  const body = (await response.json()) as { data?: WaveForecast[] };
  if (!Array.isArray(body.data) || body.data.length === 0) {
    return getWaveForecastBySpotId(spot.id);
  }

  return body.data;
}

function WaveChart({ forecast }: { forecast: WaveForecast[] }) {
  const maxWaveHeight = Math.max(...forecast.map((entry) => entry.waveHeight), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Wave chart</h3>
      <div className="mt-4 flex h-44 items-end gap-4">
        {forecast.map((entry) => (
          <div key={entry.time} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end rounded-md bg-slate-100 p-1">
              <div
                className="w-full rounded bg-cyan-600"
                style={{ height: `${(entry.waveHeight / maxWaveHeight) * 100}%` }}
              />
            </div>
            <p className="text-xs font-medium text-slate-600">{entry.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SpotDetailPage({ params }: SpotDetailPageProps) {
  const { id } = await params;
  const spot = getSurfSpotById(id);

  if (!spot) {
    notFound();
  }

  const forecast = await getSpotForecast(spot);
  const averageWindSpeed =
    forecast.length > 0
      ? (forecast.reduce((total, entry) => total + entry.windSpeed, 0) / forecast.length).toFixed(1)
      : "0.0";
  const peakWind = forecast.reduce<WaveForecast | null>(
    (strongest, current) => (!strongest || current.windSpeed > strongest.windSpeed ? current : strongest),
    null,
  );

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

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <WaveChart forecast={forecast} />

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Wind info</h3>
          <dl className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <dt>Average speed</dt>
              <dd className="font-semibold">{averageWindSpeed} kts</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Peak wind</dt>
              <dd className="font-semibold">
                {peakWind ? `${peakWind.windSpeed} kts at ${peakWind.time}` : "N/A"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Main directions</dt>
              <dd className="font-semibold">
                {forecast.length > 0 ? Array.from(new Set(forecast.map((entry) => entry.windDirection))).join(", ") : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
