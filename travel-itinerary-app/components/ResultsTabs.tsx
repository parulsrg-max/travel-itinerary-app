"use client";
import { useState } from "react";
export default function ResultsTabs({ panels }: { panels: { key: string; label: string; node: React.ReactNode }[] }) {
  const [active, setActive] = useState(panels[0]?.key);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #eee" }}>
        {panels.map(p => (
          <div key={p.key} className={`tab ${active === p.key ? "active" : ""}`} onClick={() => setActive(p.key)}>
            {p.label}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>{panels.find(p => p.key === active)?.node}</div>
    </div>
  );
}
