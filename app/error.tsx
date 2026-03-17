"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Something went wrong</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">We hit a rogue wave.</h1>
      <p className="mt-3 text-slate-600">Try reloading this section. If the issue persists, please retry in a moment.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
      >
        Try again
      </button>
      {process.env.NODE_ENV === "development" ? <p className="mt-4 text-xs text-slate-500">{error.message}</p> : null}
    </main>
  );
}
