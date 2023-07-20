// Import the fetchPaymentDetails function
import { fetchPaymentDetails } from "./payment-intent";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { session_id } = req.query;

    try {
      // Call the fetchPaymentDetails function to retrieve the payment details
      const paymentDetails = await fetchPaymentDetails(session_id);

      // Return the payment details in the API response
      res.status(200).json(paymentDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch payment details." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
