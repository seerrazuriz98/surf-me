"use client";

import dynamic from "next/dynamic";

const SurfMap = dynamic(() => import("@/components/Map").then((module) => module.SurfMap), {
  ssr: false,
});

export function SurfMapShell() {
  return <SurfMap />;
}
