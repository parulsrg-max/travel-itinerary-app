"use client";
import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTabs from "@/components/ResultsTabs";
import FlightsList from "@/components/FlightsList";
import HotelsList from "@/components/HotelsList";
import ActivitiesList from "@/components/ActivitiesList";
import PlanTimeline from "@/components/PlanTimeline";
import Checkout from "@/components/Checkout";

export default function Page() {
  const [bundle, setBundle] = useState<any | null>(null);
  const [amount, setAmount] = useState(50);

  return (
    <div>
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src="/logo.svg" width={32} height={32} alt="logo"/>
        <h1>Travel Itinerary Builder</h1>
      </header>

      <SearchForm onPlan={setBundle} />

      {!bundle ? null : (
        <ResultsTabs
          panels={[
            { key: "plan", label: "Plan", node: <PlanTimeline plan={bundle.plan} /> },
            { key: "flights", label: "Flights", node: <FlightsList data={bundle.flights} /> },
            { key: "hotels", label: "Hotels", node: <HotelsList data={bundle.hotels} /> },
            { key: "activities", label: "Things to do", node: <ActivitiesList data={bundle.activities} /> },
            { key: "checkout", label: "Pay (3DS)", node: <div className="card">
                <p>Optional: collect a booking deposit or payment for activities using Stripe (3D Secure capable).</p>
                <label>Amount (in cents): <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} /></label>
                <Checkout amount={amount} />
              </div> }
          ]}
        />
      )}
    </div>
  );
}
