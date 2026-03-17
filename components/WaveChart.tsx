"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { WaveForecast } from "@/types/surf";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface WaveChartProps {
  forecast: WaveForecast[];
}

export function WaveChart({ forecast }: WaveChartProps) {
  const labels = forecast.map((entry) => entry.time);
  const waveHeights = forecast.map((entry) => entry.waveHeight);
  const swellDirections = forecast.map((entry) => entry.swellDirection);

  const data = {
    labels,
    datasets: [
      {
        label: "Wave height (ft)",
        data: waveHeights,
        borderColor: "rgb(8, 145, 178)",
        backgroundColor: "rgba(8, 145, 178, 0.2)",
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const wave = typeof context.parsed.y === "number" ? context.parsed.y : 0;
            return `Wave: ${wave.toFixed(1)} ft`;
          },
          afterLabel: (context) => `Swell: ${swellDirections[context.dataIndex] ?? "N/A"}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} ft`,
        },
      },
    },
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Wave chart</h3>
      <div className="mt-4 h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
