import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // In a real app you'd render a Payment Element page. Here we simply redirect to a Stripe-hosted payment page via a Checkout Session alternative.
  const cs = new URL(req.url).searchParams.get('cs');
  return new NextResponse(`<html><body>
    <h1>Payment Initialized</h1>
    <p>Your client secret is:</p>
    <code>${cs}</code>
    <p>To integrate fully, replace this page with Stripe Elements PaymentElement to complete 3DS if required.</p>
  </body></html>`, { headers: { 'content-type': 'text/html' } });
}
