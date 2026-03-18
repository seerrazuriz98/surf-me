"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

interface FavoriteToggleButtonProps {
  spotId: string;
}

export function FavoriteToggleButton({ spotId }: FavoriteToggleButtonProps) {
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    async function syncUserAndFavoriteState() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserId(user?.id ?? null);

      if (!user) {
        setIsFavorite(false);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("favorites")
        .select("spot_id")
        .eq("user_id", user.id)
        .eq("spot_id", spotId)
        .maybeSingle();

      setIsFavorite(Boolean(data));
      setIsLoading(false);
    }

    void syncUserAndFavoriteState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setIsLoading(true);
      void syncUserAndFavoriteState();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [spotId, supabase]);

  async function toggleFavorite() {
    if (!supabase || !userId) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    if (isFavorite) {
      const { error } = await supabase.from("favorites").delete().eq("user_id", userId).eq("spot_id", spotId);
      setIsSubmitting(false);
      if (error) {
        setMessage(error.message);
        return;
      }
      setIsFavorite(false);
      setMessage("Removed from favorites.");
      return;
    }

    const { error } = await supabase.from("favorites").insert({ user_id: userId, spot_id: spotId });
    setIsSubmitting(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setIsFavorite(true);
    setMessage("Added to favorites.");
  }

  if (!supabase) {
    return <p className="mt-3 text-sm text-amber-700">Configure Supabase env vars to enable favorites.</p>;
  }

  if (isLoading) {
    return <p className="mt-3 text-sm text-slate-600">Loading favorite status…</p>;
  }

  if (!userId) {
    return <p className="mt-3 text-sm text-slate-600">Log in to save this spot as favorite.</p>;
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => void toggleFavorite()}
        disabled={isSubmitting}
        className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
      {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
