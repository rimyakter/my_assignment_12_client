import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import FundForm from "./FundForm";

const stripePromise = loadStripe(import.meta.env.VITE_Fund_payment_key);
const Fund = () => {
  return (
    <Elements stripe={stripePromise}>
      <FundForm></FundForm>
    </Elements>
  );
};

export default Fund;
