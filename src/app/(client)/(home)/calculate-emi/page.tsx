
"use client"
import React, { useState } from "react";

const EMICalculator: React.FC = () => {
  // State variables for user input
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);

  // State variable for EMI result
  const [emi, setEmi] = useState<number | null>(null);

  // Function to calculate EMI
  const calculateEMI = () => {
    if (loanAmount > 0 && interestRate > 0 && tenure > 0) {
      const monthlyRate = interestRate / 12 / 100; // Monthly interest rate
      const months = tenure * 12; // Total months
      const emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      setEmi(parseFloat(emi.toFixed(2))); // Round off to 2 decimal places
    } else {
      setEmi(null); // Reset EMI if inputs are invalid
    }
  };

  return (
    <section className="min-h-screen section-general-class bg-sand-soft bg-[url('/images/pattern.png')]">
      <div className="h-full w-full max-w-xl p-4 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-home">
          EMI Calculator
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateEMI();
          }}
          className="space-y-4"
        >
          {/* Loan Amount */}
          <div>
            <label htmlFor="loanAmount" className="block text-gray-700 font-medium">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount || ""}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="input-class w-full"
              placeholder="Enter loan amount"
              required
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label htmlFor="interestRate" className="block text-gray-700 font-medium">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate || ""}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="input-class w-full"
              placeholder="Enter annual interest rate"
              required
            />
          </div>

          {/* Loan Tenure */}
          <div>
            <label htmlFor="tenure" className="block text-gray-700 font-medium">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              id="tenure"
              value={tenure || ""}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="input-class w-full"
              placeholder="Enter loan tenure in years"
              required
            />
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            className="btn-class w-full"
          >
            Calculate EMI
          </button>
        </form>

        {/* EMI Display */}
        {emi !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
            <h2 className="text-xl font-bold text-gray-700">Your Monthly EMI</h2>
            <p className="text-2xl font-semibold text-home mt-2">₹ {emi}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EMICalculator;
