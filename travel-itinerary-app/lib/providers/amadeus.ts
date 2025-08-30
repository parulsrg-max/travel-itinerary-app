import { FlightOption } from "@/lib/types";
import { useMocks } from "@/lib/util";
import flightsMock from "@/mocks/flights.json";

export async function searchFlights(params: {
  origin?: string; destinationCountry: string; startDate: string; endDate: string; adults: number;
}): Promise<FlightOption[]> {
  const key = process.env.AMADEUS_API_KEY;
  const secret = process.env.AMADEUS_API_SECRET;

  if (!key || !secret) {
    if (useMocks()) return flightsMock as unknown as FlightOption[];
    return [];
  }
  // Placeholder: return mocks until OAuth & real calls are wired.
  return flightsMock as unknown as FlightOption[];
}
