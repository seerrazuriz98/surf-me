import Link from "next/link";
import { cookies } from "next/headers";
import { SpotCard } from "@/components/SpotCard";
import { createSupabaseServerClient } from "@/lib/supabase";
import { getSurfSpotById } from "@/lib/surf-data";
import type { SurfSpot } from "@/types/surf";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  let favorites: SurfSpot[] = [];
  let statusMessage = "Quick access to your personalized list of must-watch breaks.";

  try {
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      statusMessage = "Log in to see your saved favorite spots.";
    } else {
      const { data, error } = await supabase.from("favorites").select("spot_id").eq("user_id", user.id);
      if (error) {
        statusMessage = "Could not load favorites right now.";
      } else {
        favorites = (data ?? [])
          .map((favorite) => getSurfSpotById(favorite.spot_id))
          .filter((spot): spot is NonNullable<typeof spot> => Boolean(spot));
        if (favorites.length === 0) {
          statusMessage = "You have no saved spots yet. Add one from any spot detail page.";
        }
      }
    }
  } catch {
    statusMessage = "Configure Supabase env vars to enable cloud favorites.";
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-700">Favorites</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved surf spots</h1>
          <p className="mt-3 text-slate-600">{statusMessage}</p>
        </div>
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Back home
        </Link>
      </header>

      {favorites.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
