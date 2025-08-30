import { FlightOption } from "@/lib/types";
import { currency } from "@/lib/util";

export default function FlightsList({ data }: { data: FlightOption[] }) {
  return (
    <div className="list">
      {data.map(f => (
        <div className="card" key={f.id}>
          <strong>{f.origin} → {f.destination}</strong>
          <div>{f.carrier} · {f.duration}</div>
          <div>{new Date(f.departAt).toLocaleString()} – {new Date(f.arriveAt).toLocaleString()}</div>
          <div><b>{currency(f.price, f.currency)}</b></div>
          {f.deepLink && <a className="btn" href={f.deepLink} target="_blank">Book flight</a>}
        </div>
      ))}
    </div>
  );
}
