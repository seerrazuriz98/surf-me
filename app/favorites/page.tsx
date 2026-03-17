import Link from "next/link";
import { SpotCard } from "@/components/SpotCard";
import { getFavoriteSpots } from "@/lib/surf-data";

export default function FavoritesPage() {
  const favorites = getFavoriteSpots();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-700">Favorites</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved surf spots</h1>
          <p className="mt-3 text-slate-600">Quick access to your personalized list of must-watch breaks.</p>
        </div>
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Back home
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </section>
    </main>
  );
}
