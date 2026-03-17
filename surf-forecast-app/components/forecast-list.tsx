import type { Forecast } from "@/types/surf";

interface ForecastListProps {
  forecast: Forecast[];
}

export function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Hour</th>
            <th className="px-4 py-3 font-semibold">Wave (ft)</th>
            <th className="px-4 py-3 font-semibold">Swell</th>
            <th className="px-4 py-3 font-semibold">Wind (kts)</th>
            <th className="px-4 py-3 font-semibold">Tide</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((entry) => (
            <tr key={entry.hour} className="border-t border-slate-100 text-slate-700">
              <td className="px-4 py-3">{entry.hour}</td>
              <td className="px-4 py-3">{entry.waveHeightFt.toFixed(1)}</td>
              <td className="px-4 py-3">{entry.swellDirection}</td>
              <td className="px-4 py-3">{entry.windKts}</td>
              <td className="px-4 py-3 capitalize">{entry.tide}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
