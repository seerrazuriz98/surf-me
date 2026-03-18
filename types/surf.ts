export type SpotId = string;
export type UserId = string;

export type SurfDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface SurfSpot {
  id: SpotId;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  difficulty: SurfDifficulty;
  description: string;
}

export interface WaveForecast {
  time: string;
  waveHeight: number;
  swellDirection: string;
  windSpeed: number;
  windDirection: string;
}

export interface UserFavorite {
  userId: UserId;
  spotId: SpotId;
}
