export type SurfQualityLabel = "Bad" | "Fair" | "Good" | "Epic";

export interface SurfScoreInput {
  waveHeight: number;
  windSpeed: number;
  windDirection: string;
}

export interface SurfScoreResult {
  score: number;
  label: SurfQualityLabel;
}

function clampScore(value: number): number {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function getWaveHeightScore(waveHeight: number): number {
  // Mid-size surf tends to be the most broadly rideable, while tiny or very large swell lowers quality.
  if (waveHeight >= 4 && waveHeight <= 8) return 3;
  if ((waveHeight >= 2 && waveHeight < 4) || (waveHeight > 8 && waveHeight <= 10)) return 2;
  if ((waveHeight >= 1 && waveHeight < 2) || (waveHeight > 10 && waveHeight <= 12)) return 1;
  return -1;
}

function getWindSpeedScore(windSpeed: number): number {
  if (windSpeed <= 8) return 3;
  if (windSpeed <= 14) return 2;
  if (windSpeed <= 20) return 1;
  return -2;
}

function getWindDirectionScore(windDirection: string): number {
  const normalized = windDirection.trim().toUpperCase();

  // For west-facing breaks (common in this dataset), easterly flow is generally offshore,
  // northerly/southerly flow is more cross-shore, and westerly flow is mostly onshore.
  if (["E", "ENE", "ESE", "NE", "SE", "NNE", "SSE"].includes(normalized)) return 2;
  if (["N", "S", "NNW", "SSW", "NW", "SW"].includes(normalized)) return 1;
  if (["W", "WNW", "WSW"].includes(normalized)) return -2;
  return 0;
}

export function getSurfQualityLabel(score: number): SurfQualityLabel {
  if (score <= 3) return "Bad";
  if (score <= 5) return "Fair";
  if (score <= 8) return "Good";
  return "Epic";
}

export function calculateSurfScore({ waveHeight, windSpeed, windDirection }: SurfScoreInput): SurfScoreResult {
  // Base score keeps realistic combinations above the minimum before environmental adjustments.
  const rawScore = 2 + getWaveHeightScore(waveHeight) + getWindSpeedScore(windSpeed) + getWindDirectionScore(windDirection);
  const score = clampScore(rawScore);

  return {
    score,
    label: getSurfQualityLabel(score),
  };
}
