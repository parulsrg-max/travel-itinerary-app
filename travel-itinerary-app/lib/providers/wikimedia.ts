import guidesMock from "@/mocks/guides.json";
import { Guide } from "@/lib/types";
import { useMocks } from "@/lib/util";

export async function getGuides(_params: { country: string; cities?: string[] }): Promise<Guide[]> {
  if (useMocks()) return guidesMock as unknown as Guide[];
  return guidesMock as unknown as Guide[];
}
