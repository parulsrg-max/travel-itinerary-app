'use client';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/payments/create-intent', { method: 'POST', body: JSON.stringify({ amount }) })
      .then(r => r.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch(() => setClientSecret(null));
  }, [amount]);

  if (!clientSecret) return <p>Initializing payment…</p>;

  // Keep the UI minimal to avoid adding Stripe Elements bundle here.
  // In a real app you'd render <Elements><PaymentElement /></Elements>.
  return (
    <a className="btn" href={`/api/payments/pay?cs=${encodeURIComponent(clientSecret)}`}>
      Pay with Stripe (3DS-ready)
    </a>
  );
}
