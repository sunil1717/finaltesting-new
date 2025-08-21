import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../utils/axiosInstance";

const StripeCheckoutForm = ({ amount, bookingData, validateForm, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 1️ Validate form first
    if (!validateForm()) return;

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not loaded yet. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // 2️ Create PaymentIntent
      const res = await axios.post("/api/stripe/create-payment-intent", {
        amount,
        phone: bookingData.form.phone,
      });

      const { clientSecret } = res.data;

      // 3️ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", result.paymentIntent);

        // 4️ Send bookingData to backend after payment success
        await onSuccess(bookingData);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Stripe error:", err);
      setErrorMessage(
        err.response?.data?.error ||
          "Payment failed. Please check your details and try again."
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="border p-2 rounded"
        options={{
          style: { base: { fontSize: "16px" } },
          hidePostalCode: true,
        }}
      />

      {errorMessage && (
        <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Make Payment"}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
