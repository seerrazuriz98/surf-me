"use client";

import Link from "next/link";

export default function SpotError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Forecast unavailable</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Unable to load this spot right now</h1>
      <p className="mt-3 text-slate-600">Please try again, or head back and choose another break.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
        >
          Retry
        </button>
        <Link href="/" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Back home
        </Link>
      </div>
    </main>
  );
}
