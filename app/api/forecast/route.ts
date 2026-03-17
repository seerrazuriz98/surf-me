import { NextRequest, NextResponse } from "next/server";

import { getSurfForecast, SurfForecastError } from "@/lib/forecast";

class QueryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QueryValidationError";
  }
}

function parseCoordinate(value: string | null, label: "lat" | "lon"): number {
  if (value === null || value.trim() === "") {
    throw new QueryValidationError(`Missing required query parameter: ${label}`);
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new QueryValidationError(`Invalid ${label} query parameter`);
  }

  if (label === "lat" && (parsed < -90 || parsed > 90)) {
    throw new QueryValidationError("Latitude must be between -90 and 90");
  }

  if (label === "lon" && (parsed < -180 || parsed > 180)) {
    throw new QueryValidationError("Longitude must be between -180 and 180");
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

    if (error instanceof QueryValidationError || (error instanceof SurfForecastError && error.code === "VALIDATION_ERROR")) {
      return NextResponse.json(
        {
          error: message,
        },
        {
          status: 400,
        },
      );
    }

    if (error instanceof SurfForecastError && (error.code === "UPSTREAM_ERROR" || error.code === "INVALID_RESPONSE")) {
      return NextResponse.json(
        {
          error: message,
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
