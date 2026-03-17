import { NextRequest, NextResponse } from "next/server";

import { getSurfForecast } from "@/lib/forecast";

function parseCoordinate(value: string | null, label: "lat" | "lon"): number {
  if (value === null || value.trim() === "") {
    throw new Error(`Missing required query parameter: ${label}`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${label} query parameter`);
  }

  if (label === "lat" && (parsed < -90 || parsed > 90)) {
    throw new Error("Latitude must be between -90 and 90");
  }

  if (label === "lon" && (parsed < -180 || parsed > 180)) {
    throw new Error("Longitude must be between -180 and 180");
  }

  return parsed;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseCoordinate(searchParams.get("lat"), "lat");
    const lon = parseCoordinate(searchParams.get("lon"), "lon");

    const forecast = await getSurfForecast(lat, lon);

    return NextResponse.json({
      data: forecast,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error while fetching forecast";

    const isValidationError =
      message.includes("Missing required query parameter") ||
      message.includes("Invalid lat") ||
      message.includes("Invalid lon") ||
      message.includes("Latitude must be") ||
      message.includes("Longitude must be");
    const isUpstreamError =
      message.includes("Failed to fetch marine forecast") ||
      message.includes("Marine API request failed") ||
      message.includes("Marine API returned invalid JSON") ||
      message.includes("Marine API response is missing required hourly fields");

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: isValidationError ? 400 : isUpstreamError ? 502 : 500,
      },
    );
  }
}
