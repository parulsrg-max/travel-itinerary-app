import { WeatherDay } from "@/lib/types";
import ctx from "@/mocks/context.json";
import { useMocks } from "@/lib/util";

export async function getWeather(_place: string, _range: { start: string; end: string }): Promise<WeatherDay[]> {
  if (!process.env.VISUAL_CROSSING_KEY) {
    if (useMocks()) return (ctx as any).weather as WeatherDay[];
    return [];
  }
  return (ctx as any).weather as WeatherDay[];
}
