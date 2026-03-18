import type { WaveForecast } from "@/types/surf";
import { calculateSurfScore, type SurfQualityLabel } from "@/lib/surfScore";

interface ForecastListProps {
  forecast: WaveForecast[];
}

export function ForecastList({ forecast }: ForecastListProps) {
  const qualityStyles: Record<SurfQualityLabel, string> = {
    Bad: "bg-rose-100 text-rose-800",
    Fair: "bg-amber-100 text-amber-800",
    Good: "bg-cyan-100 text-cyan-800",
    Epic: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Hour</th>
            <th className="px-4 py-3 font-semibold">Wave (ft)</th>
            <th className="px-4 py-3 font-semibold">Swell</th>
            <th className="px-4 py-3 font-semibold">Wind (kts)</th>
            <th className="px-4 py-3 font-semibold">Wind direction</th>
            <th className="px-4 py-3 font-semibold">Surf score</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((entry) => {
            const surfScore = calculateSurfScore({
              waveHeight: entry.waveHeight,
              windSpeed: entry.windSpeed,
              windDirection: entry.windDirection,
            });

            return (
              <tr key={entry.time} className="border-t border-slate-100 text-slate-700">
                <td className="px-4 py-3">{entry.time}</td>
                <td className="px-4 py-3">{entry.waveHeight.toFixed(1)}</td>
                <td className="px-4 py-3">{entry.swellDirection}</td>
                <td className="px-4 py-3">{entry.windSpeed}</td>
                <td className="px-4 py-3">{entry.windDirection}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${qualityStyles[surfScore.label]}`}>
                    {surfScore.label} · {surfScore.score}/10
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
