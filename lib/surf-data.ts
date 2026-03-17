import type { SurfSpot, UserFavorite, WaveForecast } from "@/types/surf";

const surfSpots: SurfSpot[] = [
  {
    id: "pichilemu-punta-de-lobos",
    name: "Punta de Lobos",
    country: "Chile",
    latitude: -34.412,
    longitude: -72.035,
    difficulty: "Advanced",
    description: "Powerful left-hand point break with long walls and heavy sections.",
  },
  {
    id: "arica-el-gringo",
    name: "El Gringo",
    country: "Chile",
    latitude: -18.483,
    longitude: -70.323,
    difficulty: "Intermediate",
    description: "Fast reef break with punchy takeoffs and short, hollow rides.",
  },
  {
    id: "constitucion-los-gringos",
    name: "Los Gringos",
    country: "Chile",
    latitude: -35.333,
    longitude: -72.41,
    difficulty: "Beginner",
    description: "Friendly beach break with softer peaks, ideal for progression days.",
  },
];

const waveForecastBySpotId: Record<string, WaveForecast[]> = {
  "pichilemu-punta-de-lobos": [
    { time: "06:00", waveHeight: 6.2, swellDirection: "SW", windSpeed: 10, windDirection: "SE" },
    { time: "12:00", waveHeight: 7.1, swellDirection: "SW", windSpeed: 13, windDirection: "SSE" },
    { time: "18:00", waveHeight: 5.8, swellDirection: "SSW", windSpeed: 8, windDirection: "E" },
  ],
  "arica-el-gringo": [
    { time: "06:00", waveHeight: 4.3, swellDirection: "W", windSpeed: 6, windDirection: "S" },
    { time: "12:00", waveHeight: 5.2, swellDirection: "WNW", windSpeed: 9, windDirection: "SW" },
    { time: "18:00", waveHeight: 4.7, swellDirection: "W", windSpeed: 7, windDirection: "SE" },
  ],
  "constitucion-los-gringos": [
    { time: "06:00", waveHeight: 2.8, swellDirection: "S", windSpeed: 5, windDirection: "NE" },
    { time: "12:00", waveHeight: 3.4, swellDirection: "SSE", windSpeed: 11, windDirection: "NW" },
    { time: "18:00", waveHeight: 3.1, swellDirection: "S", windSpeed: 6, windDirection: "N" },
  ],
};

const userFavorites: UserFavorite[] = [
  { userId: "demo-user", spotId: "pichilemu-punta-de-lobos" },
  { userId: "demo-user", spotId: "constitucion-los-gringos" },
];

export function getSurfSpots(): SurfSpot[] {
  return surfSpots;
}

export function getSurfSpotById(spotId: string): SurfSpot | undefined {
  return surfSpots.find((spot) => spot.id === spotId);
}

export function getFavoriteSpots(): SurfSpot[] {
  const favoriteSpotIds = new Set(userFavorites.filter((favorite) => favorite.userId === "demo-user").map((favorite) => favorite.spotId));
  return surfSpots.filter((spot) => favoriteSpotIds.has(spot.id));
}

export function getWaveForecastBySpotId(spotId: string): WaveForecast[] {
  return waveForecastBySpotId[spotId] ?? [];
}
