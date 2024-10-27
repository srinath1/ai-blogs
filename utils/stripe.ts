import Stripe from "stripe";
const secret_key = process.env.STRIPE_SECRET_KEY;
if (!secret_key) {
  throw new Error("Stripe key not found");
}
const stripe = new Stripe(secret_key);
export default stripe;
