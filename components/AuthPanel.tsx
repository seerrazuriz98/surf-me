"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export function AuthPanel() {
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (!supabase) {
    return (
      <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable authentication.
      </section>
    );
  }

  async function handleSignIn() {
    if (!supabase) return;
    setIsSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);
    setMessage(error ? error.message : "Logged in successfully.");
  }

  async function handleSignUp() {
    if (!supabase) return;
    setIsSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setIsSubmitting(false);
    setMessage(error ? error.message : "Signup successful. Check your email for confirmation.");
  }

  async function handleSignOut() {
    if (!supabase) return;
    setIsSubmitting(true);
    setMessage(null);
    const { error } = await supabase.auth.signOut();
    setIsSubmitting(false);
    setMessage(error ? error.message : "Logged out successfully.");
  }

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Account</h2>
      {session ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-700">Signed in as {session.user.email}</p>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            disabled={isSubmitting}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void handleSignIn()}
            disabled={isSubmitting}
            className="rounded-lg bg-cyan-700 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => void handleSignUp()}
            disabled={isSubmitting}
            className="rounded-lg border border-cyan-700 px-3 py-2 text-sm font-semibold text-cyan-700 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Signup
          </button>
        </form>
      )}
      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
