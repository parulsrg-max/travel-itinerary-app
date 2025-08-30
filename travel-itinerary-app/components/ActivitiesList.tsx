import { Activity } from "@/lib/types";
import { currency } from "@/lib/util";

export default function ActivitiesList({ data }: { data: Activity[] }) {
  return (
    <div className="list">
      {data.map(a => (
        <div className="card" key={a.id}>
          <strong>{a.title}</strong>
          {a.durationMins ? <div>Duration: {a.durationMins} mins</div> : null}
          {a.price ? <div><b>{currency(a.price, a.currency ?? "USD")}</b></div> : null}
          {a.deepLink && <a className="btn" href={a.deepLink} target="_blank">Book activity</a>}
        </div>
      ))}
    </div>
  );
}
