import { NextRequest, NextResponse } from "next/server";
import { buildPlan } from "@/lib/planner";
import { searchFlights } from "@/lib/providers/amadeus";
import { searchHotels } from "@/lib/providers/expedia";
import { searchActivities } from "@/lib/providers/viator";
import { getPOIs } from "@/lib/providers/opentripmap";
import { getWeather } from "@/lib/providers/weather";
import { getHolidays } from "@/lib/providers/holidays";
import { getGuides } from "@/lib/providers/wikimedia";
import { SearchInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SearchInput;

  const [flights, hotels, activities, pois, _weather, _holidays, _guides] = await Promise.all([
    searchFlights({
      origin: body.originAirport,
      destinationCountry: body.country,
      startDate: body.startDate,
      endDate: body.endDate,
      adults: body.adults
    }),
    // crude city centroid -> mock; in real calls, compute lat/lon per city
    searchHotels({ lat: 41.9, lon: 12.49, startDate: body.startDate, endDate: body.endDate, adults: body.adults }),
    searchActivities({
      country: body.country,
      cities: body.cities,
      startDate: body.startDate,
      endDate: body.endDate,
      tags: body.interests
    }),
    getPOIs({ country: body.country, cities: body.cities }),
    getWeather(body.cities?.[0] ?? body.country, { start: body.startDate, end: body.endDate }),
    getHolidays(body.country.slice(0, 2).toUpperCase(), new Date(body.startDate).getFullYear()),
    getGuides({ country: body.country, cities: body.cities })
  ]);

  const plan = buildPlan(body, flights, hotels, activities, pois);
  return NextResponse.json({ flights, hotels, activities, pois, plan });
}
