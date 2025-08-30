import { HotelOption } from "@/lib/types";
import { currency } from "@/lib/util";

export default function HotelsList({ data }: { data: HotelOption[] }) {
  return (
    <div className="list">
      {data.map(h => (
        <div className="card" key={h.id}>
          <strong>{h.name}</strong>
          <div>{h.address ?? ''}</div>
          <div>Rating: {h.rating ?? 'N/A'} · Free cancel: {h.freeCancel ? 'Yes' : 'No'}</div>
          <div><b>{currency(h.price, h.currency)}</b></div>
          {h.deepLink && <a className="btn" href={h.deepLink} target="_blank">Book hotel</a>}
        </div>
      ))}
    </div>
  );
}
