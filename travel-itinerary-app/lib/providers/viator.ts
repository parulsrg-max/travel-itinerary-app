import actsMock from "@/mocks/activities.json";
import { Activity } from "@/lib/types";
import { useMocks } from "@/lib/util";

export async function searchActivities(_params: {
  country: string; cities?: string[]; startDate: string; endDate: string; tags?: string[];
}): Promise<Activity[]> {
  if (!process.env.VIATOR_API_KEY) {
    if (useMocks()) return actsMock as unknown as Activity[];
    return [];
  }
  return actsMock as unknown as Activity[];
}
