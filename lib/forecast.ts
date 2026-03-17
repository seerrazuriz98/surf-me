import type { WaveForecast } from "@/types/surf";

const OPEN_METEO_MARINE_API = "https://marine-api.open-meteo.com/v1/marine";
const CACHE_TTL_MS = 10 * 60 * 1000;

type ForecastCacheEntry = {
  expiresAt: number;
  data: WaveForecast[];
};

type MarineApiResponse = {
  hourly?: {
    time?: string[];
    wave_height?: Array<number | null>;
    swell_wave_direction?: Array<number | null>;
    wind_speed?: Array<number | null>;
    wind_direction?: Array<number | null>;
  };
};

const globalCache = globalThis as typeof globalThis & {
  __surfForecastCache?: Map<string, ForecastCacheEntry>;
};

const forecastCache = globalCache.__surfForecastCache ?? new Map<string, ForecastCacheEntry>();

if (!globalCache.__surfForecastCache) {
  globalCache.__surfForecastCache = forecastCache;
}

function toCacheKey(lat: number, lon: number): string {
  return `${lat.toFixed(4)},${lon.toFixed(4)}`;
}

function isValidCoordinate(value: number): boolean {
  return Number.isFinite(value);
}

function degreesToCompass(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(normalized / 22.5) % directions.length;
  return directions[index];
}

function normalizeForecast(data: MarineApiResponse): WaveForecast[] {
  const hourly = data.hourly;

  if (!hourly?.time || !hourly.wave_height || !hourly.swell_wave_direction || !hourly.wind_speed || !hourly.wind_direction) {
    throw new Error("Marine API response is missing required hourly fields");
  }

  const length = Math.min(
    hourly.time.length,
    hourly.wave_height.length,
    hourly.swell_wave_direction.length,
    hourly.wind_speed.length,
    hourly.wind_direction.length,
  );

  const normalized: WaveForecast[] = [];

  for (let i = 0; i < length; i += 1) {
    const waveHeight = hourly.wave_height[i];
    const swellWaveDirection = hourly.swell_wave_direction[i];
    const windSpeed = hourly.wind_speed[i];
    const windDirection = hourly.wind_direction[i];
    const time = hourly.time[i];

    if (
      typeof time !== "string" ||
      typeof waveHeight !== "number" ||
      typeof swellWaveDirection !== "number" ||
      typeof windSpeed !== "number" ||
      typeof windDirection !== "number"
    ) {
      continue;
    }

    normalized.push({
      time,
      waveHeight,
      swellDirection: degreesToCompass(swellWaveDirection),
      windSpeed,
      windDirection: degreesToCompass(windDirection),
    });
  }

  return normalized;
}

export async function getSurfForecast(lat: number, lon: number): Promise<WaveForecast[]> {
  if (!isValidCoordinate(lat) || !isValidCoordinate(lon)) {
    throw new Error("Latitude and longitude must be valid numbers");
  }

  const cacheKey = toCacheKey(lat, lon);
  const now = Date.now();
  const cached = forecastCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: "wave_height,swell_wave_direction,wind_speed,wind_direction",
  });

  let response: Response;

  try {
    response = await fetch(`${OPEN_METEO_MARINE_API}?${params.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch marine forecast: ${error instanceof Error ? error.message : "unknown error"}`);
  }

  if (!response.ok) {
    throw new Error(`Marine API request failed with status ${response.status}`);
  }

  let payload: MarineApiResponse;

  try {
    payload = (await response.json()) as MarineApiResponse;
  } catch {
    throw new Error("Marine API returned invalid JSON");
  }

  const normalized = normalizeForecast(payload);
  forecastCache.set(cacheKey, {
    expiresAt: now + CACHE_TTL_MS,
    data: normalized,
  });

  return normalized;
}
