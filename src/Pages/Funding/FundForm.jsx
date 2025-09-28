import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const FundForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // ✅ get current user

  const [amount, setAmount] = useState(""); // dollars
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const card = elements.getElement(CardElement);
      if (!card) return;

      // 1️⃣ Create PaymentIntent via Axios
      const { data } = await axiosSecure.post(
        "/create-payment-intent",
        { amount: Math.round(numericAmount * 100) } // convert dollars to cents
      );

      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        setError("Failed to create payment. Try again.");
        setLoading(false);
        return;
      }

      // 2️⃣ Confirm card payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email || "no-email@example.com",
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Thank you ${
            user?.displayName || "User"
          } for donating $${numericAmount.toFixed(2)}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setAmount(""); // reset input

        await axiosSecure.post("/save-fund", {
          amount: Math.round(numericAmount * 100), // store cents
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Contribute Funding
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount input */}
        <input
          type="number"
          placeholder="Enter amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />

        {/* Card input */}
        <div className="px-5 py-3 border border-gray-300 rounded-lg focus-within:border-primary">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full btn btn-primary mt-4"
        >
          {loading ? "Processing..." : "Give Funding"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default FundForm;
