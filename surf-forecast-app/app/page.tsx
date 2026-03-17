import Link from "next/link";
import { SpotsMap } from "@/components/spots-map";
import { SpotCard } from "@/components/spot-card";
import { getSurfSpots } from "@/lib/surf-data";

export default function HomePage() {
  const spots = getSurfSpots();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">surf-me</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Personalized surf forecast tracker
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore curated surf spots, review wave forecasts, and save your favorites in one production-ready app shell.
          </p>
        </div>
        <Link href="/favorites" className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">
          Go to favorites
        </Link>
      </header>

      <SpotsMap spots={spots} />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </section>
    </main>
  );
}
