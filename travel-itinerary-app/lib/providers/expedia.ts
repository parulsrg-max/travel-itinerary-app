import { HotelOption } from "@/lib/types";
import hotelsMock from "@/mocks/hotels.json";
import { useMocks } from "@/lib/util";

export async function searchHotels(_params: {
  lat: number; lon: number; startDate: string; endDate: string; adults: number;
}): Promise<HotelOption[]> {
  if (!process.env.EXPEDIA_RAPID_KEY || !process.env.EXPEDIA_RAPID_SECRET) {
    if (useMocks()) return hotelsMock as unknown as HotelOption[];
    return [];
  }
  return hotelsMock as unknown as HotelOption[];
}
