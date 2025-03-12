"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GetInTouchPopupProps {
  propertyTitle: string;
  onClose: () => void;
}

const GetInTouchPopup: React.FC<GetInTouchPopupProps> = ({ propertyTitle, onClose }) => {
  const [step, setStep] = useState(1);
  const [bhk, setBhk] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in ${propertyTitle}`,
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Move to the Next Step
  const proceedToForm = (selectedBhk: string) => {
    setBhk(selectedBhk);
    setStep(2);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Choose Configuration" : "Contact Details"}</DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          // Step 1: BHK Selection
          <div className="grid grid-cols-2 gap-4">
            {["1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((option) => (
              <button
                key={option}
                className="border border-gray-300 py-2 rounded-md text-center hover:bg-gray-100 transition"
                onClick={() => proceedToForm(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          // Step 2: Contact Form
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Form submitted for ${bhk}: ${JSON.stringify(formData)}`);
              onClose();
            }}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (Optional)"
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <textarea
              value={formData.message}
              readOnly
              className="border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GetInTouchPopup;
