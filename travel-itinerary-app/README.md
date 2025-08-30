# Custom Travel Itinerary Builder

Country-first planner that fetches flights, hotels, activities (Viator), Pinterest inspiration, open POIs (OpenTripMap), guide blurbs (Wikivoyage), weather, and holidays — then builds an editable, day-by-day itinerary.

## Quick Start

```bash
pnpm i
cp .env.example .env.local   # optional: leave empty to use mocks
pnpm dev
```

Open http://localhost:3000 and generate a sample plan.

## Live Bookings & Payments (3DS-ready)

- Flight/Hotel/Activity **cards include deep links** to provider booking pages (affiliates can be plugged in).
- **Stripe Payments**: `/api/payments/create-intent` creates a PaymentIntent with `automatic_payment_methods` and `request_three_d_secure=automatic`. Use the **Checkout** tab to test.
- Configure environment variables in `.env.local`:
  - `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`
  - `NEXT_PUBLIC_PAYMENT_CURRENCY` (e.g., `USD` or `EUR`)

> 3D Secure (SCA) is invoked automatically by Stripe when required by the issuer. See Stripe docs for Payment Intents + Payment Element.

## ToS & Attribution

Follow provider terms; add attribution where required (e.g., Wikimedia, Visual Crossing).

## Deployment

- Deploy to **Vercel**. Set env vars. Build. Done.
