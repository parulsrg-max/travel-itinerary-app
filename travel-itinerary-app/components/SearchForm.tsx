"use client";
import { useState } from "react";

export default function SearchForm({ onPlan }: { onPlan: (payload: any) => void }) {
  const [country, setCountry] = useState("Italy");
  const [cities, setCities] = useState("Rome,Florence,Venice");
  const [startDate, setStart] = useState("2025-10-20");
  const [endDate, setEnd] = useState("2025-10-27");
  const [adults, setAdults] = useState(2);
  const [interests, setInterests] = useState("food,history");
  const [originAirport, setOrigin] = useState("DEL");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      country,
      cities: cities.split(",").map(s => s.trim()).filter(Boolean),
      startDate, endDate, adults, originAirport,
      interests: interests.split(",").map(s => s.trim()).filter(Boolean)
    };
    const res = await fetch("/api/plan", { method: "POST", body: JSON.stringify(payload) });
    onPlan(await res.json());
  };

  return (
    <form onSubmit={submit} className="card">
      <h2>Search</h2>
      <div className="row">
        <label>Country<input value={country} onChange={e => setCountry(e.target.value)} /></label>
        <label>Cities<input value={cities} onChange={e => setCities(e.target.value)} /></label>
        <label>Origin airport<input value={originAirport} onChange={e => setOrigin(e.target.value)} /></label>
        <label>Start<input type="date" value={startDate} onChange={e => setStart(e.target.value)} /></label>
        <label>End<input type="date" value={endDate} onChange={e => setEnd(e.target.value)} /></label>
        <label>Interests<input value={interests} onChange={e => setInterests(e.target.value)} /></label>
      </div>
      <div style={{ marginTop: 10 }}>
        <button type="submit">Generate plan</button>
      </div>
    </form>
  );
}
