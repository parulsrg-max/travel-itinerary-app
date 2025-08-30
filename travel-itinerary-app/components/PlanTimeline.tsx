import { Plan } from "@/lib/types";

export default function PlanTimeline({ plan }: { plan: Plan }) {
  const days = Object.entries(plan.days);
  return (
    <div>
      {days.map(([day, items]) => (
        <div key={day}>
          <h3>{new Date(day).toDateString()}</h3>
          <div className="list">
            {items.map(it => (
              <div className="card" key={it.id}>
                <strong>{it.start}–{it.end}</strong> {it.title}
                {it.lat && it.lon ? <div>({it.lat.toFixed(4)}, {it.lon.toFixed(4)})</div> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
      {plan.notes?.length ? <p><em>{plan.notes.join(" ")}</em></p> : null}
    </div>
  );
}
