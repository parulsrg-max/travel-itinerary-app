import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY || '';
export const stripe = new Stripe(secret, { apiVersion: '2024-06-20' } as any);

export function isStripeReady() {
  return !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_PUBLISHABLE_KEY;
}
