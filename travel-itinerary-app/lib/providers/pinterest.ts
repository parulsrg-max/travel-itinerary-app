import pinsMock from "@/mocks/pins.json";
import { InspirationPin } from "@/lib/types";
import { useMocks } from "@/lib/util";

export async function searchPins(_query: string): Promise<InspirationPin[]> {
  if (!process.env.PINTEREST_APP_ID || !process.env.PINTEREST_APP_SECRET) {
    if (useMocks()) return pinsMock as unknown as InspirationPin[];
    return [];
  }
  return pinsMock as unknown as InspirationPin[];
}
