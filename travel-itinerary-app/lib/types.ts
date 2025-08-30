export type SearchInput = {
  country: string;
  cities?: string[];
  startDate: string; // ISO
  endDate: string;   // ISO
  adults: number;
  budgetTier?: "budget" | "mid" | "premium";
  interests?: string[]; // ["food","history","outdoors","design"]
  originAirport?: string; // e.g., "DEL"
};

export type FlightOption = {
  id: string;
  price: number;
  currency: string;
  carrier: string;
  origin: string;
  destination: string;
  departAt: string;
  arriveAt: string;
  duration: string;
  deepLink?: string;
};

export type HotelOption = {
  id: string;
  name: string;
  lat: number; lon: number;
  price: number; currency: string;
  rating?: number; freeCancel?: boolean;
  image?: string; address?: string; deepLink?: string;
};

export type Activity = {
  id: string; title: string; vendor: "viator";
  description?: string; price?: number; currency?: string;
  durationMins?: number; lat?: number; lon?: number;
  startTimes?: string[]; deepLink?: string; image?: string; tags?: string[];
};

export type InspirationPin = { id: string; title: string; image: string; link?: string; };

export type POI = { id: string; name: string; lat: number; lon: number; kind?: string; hours?: string; url?: string; };

export type Guide = { place: string; lead: string; sections: Record<string, string>; attribution?: string; };

export type WeatherDay = { date: string; minC: number; maxC: number; precipProb?: number; summary?: string; };

export type Holiday = { date: string; name: string; };

export type PlanItem = {
  id: string;
  date: string; // day ISO
  start: string; // "09:30"
  end: string;   // "11:00"
  title: string;
  type: "flight" | "checkin" | "activity" | "poi";
  ref?: string; // provider id
  lat?: number; lon?: number;
};

export type Plan = { days: Record<string, PlanItem[]>; notes?: string[]; };
