import type { SurfSpot } from "@/types/surf";

const surfSpots: SurfSpot[] = [
  {
    id: "pichilemu-punta-de-lobos",
    name: "Punta de Lobos",
    region: "Pichilemu, Chile",
    coordinates: { lat: -34.412, lng: -72.035 },
    difficulty: "Advanced",
    bestSwell: "SW",
    isFavorite: true,
    forecast: [
      { hour: "06:00", waveHeightFt: 6.2, swellDirection: "SW", windKts: 10, tide: "low" },
      { hour: "12:00", waveHeightFt: 7.1, swellDirection: "SW", windKts: 13, tide: "mid" },
      { hour: "18:00", waveHeightFt: 5.8, swellDirection: "SSW", windKts: 8, tide: "high" },
    ],
  },
  {
    id: "arica-el-gringo",
    name: "El Gringo",
    region: "Arica, Chile",
    coordinates: { lat: -18.483, lng: -70.323 },
    difficulty: "Intermediate",
    bestSwell: "W",
    isFavorite: false,
    forecast: [
      { hour: "06:00", waveHeightFt: 4.3, swellDirection: "W", windKts: 6, tide: "mid" },
      { hour: "12:00", waveHeightFt: 5.2, swellDirection: "WNW", windKts: 9, tide: "high" },
      { hour: "18:00", waveHeightFt: 4.7, swellDirection: "W", windKts: 7, tide: "low" },
    ],
  },
  {
    id: "constitucion-los-gringos",
    name: "Los Gringos",
    region: "Constitución, Chile",
    coordinates: { lat: -35.333, lng: -72.41 },
    difficulty: "Beginner",
    bestSwell: "S",
    isFavorite: true,
    forecast: [
      { hour: "06:00", waveHeightFt: 2.8, swellDirection: "S", windKts: 5, tide: "high" },
      { hour: "12:00", waveHeightFt: 3.4, swellDirection: "SSE", windKts: 11, tide: "mid" },
      { hour: "18:00", waveHeightFt: 3.1, swellDirection: "S", windKts: 6, tide: "low" },
    ],
  },
];

export function getSurfSpots(): SurfSpot[] {
  return surfSpots;
}

export function getSurfSpotById(spotId: string): SurfSpot | undefined {
  return surfSpots.find((spot) => spot.id === spotId);
}

export function getFavoriteSpots(): SurfSpot[] {
  return surfSpots.filter((spot) => spot.isFavorite);
}
