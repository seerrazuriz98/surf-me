"use client";

import dynamic from "next/dynamic";

const SurfMap = dynamic(() => import("@/components/Map").then((module) => module.SurfMap), {
  ssr: false,
  loading: () => (
    <section className="glass-card mb-10 rounded-2xl p-4 sm:p-6">
      <div className="skeleton h-7 w-40 rounded-md" />
      <div className="skeleton mt-3 h-5 w-64 rounded-md" />
      <div className="skeleton mt-4 h-[320px] w-full rounded-lg sm:h-[420px]" />
    </section>
  ),
});

export function SurfMapShell() {
  return <SurfMap />;
}
