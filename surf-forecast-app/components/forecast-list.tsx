import type { WaveForecast } from "@/types/surf";

interface ForecastListProps {
  forecast: WaveForecast[];
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
            <th className="px-4 py-3 font-semibold">Wind direction</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((entry) => (
            <tr key={entry.time} className="border-t border-slate-100 text-slate-700">
              <td className="px-4 py-3">{entry.time}</td>
              <td className="px-4 py-3">{entry.waveHeight.toFixed(1)}</td>
              <td className="px-4 py-3">{entry.swellDirection}</td>
              <td className="px-4 py-3">{entry.windSpeed}</td>
              <td className="px-4 py-3">{entry.windDirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
