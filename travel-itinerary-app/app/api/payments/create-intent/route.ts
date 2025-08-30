import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeReady } from '@/lib/payments/stripe';

export async function POST(req: NextRequest) {
  if (!isStripeReady()) return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 });
  const body = await req.text();
  const { amount } = JSON.parse(body || '{}');

  if (!amount || amount < 50) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });

  const currency = process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || 'USD';

  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true }, // handles 3DS automatically when required
    payment_method_options: { card: { request_three_d_secure: 'automatic' } }
  });

  return NextResponse.json({ clientSecret: intent.client_secret });
}
