"use client";
import React, { useState } from "react";

const LoanEligibility: React.FC = () => {
  // State variables for user input
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);

  // State variable for eligibility result
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState<number | null>(null);

  // Function to calculate Loan Eligibility
  const calculateLoanEligibility = () => {
    if (monthlyIncome > 0 && interestRate > 0 && tenure > 0) {
      const availableEMI = (monthlyIncome * 0.5) - existingEmi; // 50% of income minus existing EMIs
      const monthlyRate = interestRate / 12 / 100; // Monthly interest rate
      const months = tenure * 12; // Total tenure in months

      // Loan Eligibility Formula
      const loanAmount = availableEMI * ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate);

      setEligibleLoanAmount(parseFloat(loanAmount.toFixed(2))); // Round off to 2 decimal places
    } else {
      setEligibleLoanAmount(null); // Reset if inputs are invalid
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="max-w-xl w-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-home">Loan Eligibility Calculator</h1>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateLoanEligibility();
          }}
          className="space-y-4"
        >
          {/* Monthly Income */}
          <div>
            <label htmlFor="monthlyIncome" className="block text-gray-700 font-medium">
              Monthly Income (₹)
            </label>
            <input
              type="number"
              id="monthlyIncome"
              value={monthlyIncome || ""}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="input-class w-full"
              placeholder="Enter your monthly income"
              required
            />
          </div>

          {/* Existing EMI Obligations */}
          <div>
            <label htmlFor="existingEmi" className="block text-gray-700 font-medium">
              Existing EMIs (₹)
            </label>
            <input
              type="number"
              id="existingEmi"
              value={existingEmi || ""}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="input-class w-full"
              placeholder="Enter total existing EMIs"
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
          <button type="submit" className="btn-class w-full">
            Calculate Eligibility
          </button>
        </form>

        {/* Loan Eligibility Display */}
        {eligibleLoanAmount !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
            <h2 className="text-xl font-bold text-gray-700">Maximum Eligible Loan Amount</h2>
            <p className="text-2xl font-semibold text-home mt-2">₹ {eligibleLoanAmount}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoanEligibility;
