import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
    let stripePromise = null;
  
    const getStripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      }
      return stripePromise;
    };
  
    const stripe = await getStripe();
  
    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `${window.location.origin}/Orders?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });

  //intiate a order corresponding to the line items
  
  }