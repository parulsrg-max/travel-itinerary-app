import { Holiday } from "@/lib/types";
import ctx from "@/mocks/context.json";
import { useMocks } from "@/lib/util";

export async function getHolidays(_countryCode: string, _year: number): Promise<Holiday[]> {
  const provider = process.env.HOLIDAYS_PROVIDER ?? "nager";
  if (provider !== "nager") {
    if (useMocks()) return (ctx as any).holidays as Holiday[];
    return [];
  }
  return (ctx as any).holidays as Holiday[];
}
