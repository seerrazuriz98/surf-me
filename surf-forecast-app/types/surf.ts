export type TideCondition = "low" | "mid" | "high";

export interface Forecast {
  hour: string;
  waveHeightFt: number;
  swellDirection: string;
  windKts: number;
  tide: TideCondition;
}

export interface SurfSpot {
  id: string;
  name: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  bestSwell: string;
  isFavorite: boolean;
  forecast: Forecast[];
}
