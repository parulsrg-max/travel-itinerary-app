export const safeFetch = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export const withinDates = (d: string, start: string, end: string) =>
  new Date(d) >= new Date(start) && new Date(d) <= new Date(end);

export const env = (k: string) => process.env[k];

export const useMocks = () => (process.env.USE_MOCKS ?? "true") === "true";

export const currency = (n: number, c = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(n);
