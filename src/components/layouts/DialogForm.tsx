"use client"

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const DialogForm = () => {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        serviceType: "buyProperty",
        message: "",
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("/api/", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            toast({
                description: response?.data?.msg || "Form submitted successfully!"
            })
            setFormData({
                name: "",
                contact: "",
                email: "",
                serviceType: "buyProperty",
                message: "",
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    description: error.response?.data?.error || "Unable to submit data. Something went wrong"
                })
            } else {
                toast({
                    description: "An unexpected error occurred."
                })
            }
            console.error("Error submitting data:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                    />
                </div>

                {/* Contact Input */}
                <div className="space-y-2">
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                    />
                </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                />
            </div>

            {/* Service Type Selection */}
            <div className="space-y-2">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                    I'm interested in
                </label>
                <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                    <option value="buyProperty">Buying a Property</option>
                    <option value="sellProperty">Selling a Property</option>
                    <option value="interiorDesign">Interior Design Services</option>
                    <option value="consultation">Property Consultation</option>
                </select>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us more about your requirements..."
                />
            </div>

            {/* Submit Button */}
            <button
                disabled={loading}
                type="submit"
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                    </>
                ) : (
                    "Send Message"
                )}
            </button>
        </form>
    )
}

export default DialogForm
