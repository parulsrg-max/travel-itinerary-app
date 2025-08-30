import poisMock from "@/mocks/pois.json";
import { POI } from "@/lib/types";
import { useMocks } from "@/lib/util";

export async function getPOIs(_params: { country: string; cities?: string[] }): Promise<POI[]> {
  if (!process.env.OPENTRIPMAP_API_KEY) {
    if (useMocks()) return poisMock as unknown as POI[];
    return [];
  }
  return poisMock as unknown as POI[];
}
