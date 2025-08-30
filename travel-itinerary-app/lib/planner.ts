import { Activity, FlightOption, HotelOption, Plan, PlanItem, POI, SearchInput } from "./types";
import { addMinutes, format, parseISO } from "date-fns";

function slot(time: string, mins: number) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, h, m);
  const end = addMinutes(date, mins);
  return { start: time, end: format(end, "HH:mm") };
}

export function buildPlan(
  input: SearchInput,
  flights: FlightOption[],
  hotels: HotelOption[],
  activities: Activity[],
  pois: POI[]
): Plan {
  const days: Record<string, PlanItem[]> = {};
  const start = parseISO(input.startDate);
  const end = parseISO(input.endDate);
  const dayCount = Math.max(1, Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)) + 1);

  // Initialize empty days
  for (let i = 0; i < dayCount; i++) {
    const d = new Date(+start + i * 86400000);
    const key = format(d, "yyyy-MM-dd");
    days[key] = [];
  }

  // Anchor: first flight (if any) and check-in on day 1
  const firstDay = format(start, "yyyy-MM-dd");
  if (flights[0]) {
    days[firstDay].push({
      id: `flt-${flights[0].id}`,
      date: firstDay,
      start: format(parseISO(flights[0].departAt), "HH:mm"),
      end: format(parseISO(flights[0].arriveAt), "HH:mm"),
      title: `Flight ${flights[0].origin}→${flights[0].destination}`,
      type: "flight",
      ref: flights[0].id
    });
  }
  if (hotels[0]) {
    days[firstDay].push({
      id: `chk-${hotels[0].id}`,
      date: firstDay,
      start: "15:00",
      end: "16:00",
      title: `Hotel check-in: ${hotels[0].name}`,
      type: "checkin",
      ref: hotels[0].id,
      lat: hotels[0].lat, lon: hotels[0].lon
    });
  }

  // Pack activities/POIs: morning/afternoon/evening heuristic
  const candidateItems = [
    ...activities.map(a => ({ kind: "activity" as const, a })),
    ...pois.map(p => ({ kind: "poi" as const, p }))
  ];

  let ai = 0;
  for (let di = 0; di < dayCount; di++) {
    const key = format(new Date(+start + di * 86400000), "yyyy-MM-dd");
    const day = days[key];

    const blocks = [
      { label: "morning", start: "09:30", mins: 120 },
      { label: "afternoon", start: "13:00", mins: 150 },
      { label: "evening", start: "18:00", mins: 120 }
    ];

    for (const b of blocks) {
      if (ai >= candidateItems.length) break;
      const s = slot(b.start, b.mins);

      const it = candidateItems[ai++];
      if (it.kind === "activity") {
        const a = it.a;
        day.push({
          id: `act-${a.id}`,
          date: key, start: s.start, end: s.end,
          title: `Activity: ${a.title}`,
          type: "activity", ref: a.id, lat: a.lat, lon: a.lon
        });
      } else {
        const p = it.p;
        day.push({
          id: `poi-${p.id}`,
          date: key, start: s.start, end: s.end,
          title: `See: ${p.name}`, type: "poi", ref: p.id, lat: p.lat, lon: p.lon
        });
      }
    }
  }

  return { days, notes: ["Drag & drop to rearrange; times auto-adjust."] };
}
