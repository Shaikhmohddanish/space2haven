"use client"

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const DialogForm = () => {

    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        serviceType: "buy",
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                description: response?.data?.msg
            })
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
        <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-2xl">
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-class"
                    placeholder="Enter your name"
                />
            </div>

            {/* Contact Input */}
            <div>
                <label htmlFor="contact" className="block text-gray-700 mb-1">Contact</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="input-class"
                    placeholder="Enter your contact"
                />
            </div>

            {/* Service Type Selection */}
            <div>
                <label htmlFor="serviceType" className="block text-gray-700 mb-1">Type of Service</label>
                <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="input-class"
                >
                    <option value="buyProperty">Buy Property</option>
                    <option value="sellProperty">Sell Property</option>
                    <option value="interiorDesign">Interior Design</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                disabled={loading}
                type="submit"
                className="m-0 btn-class w-full flex justify-center"
            >
                {loading ? (<div className="w-6 h-6 loader-common-styles" />) : "Submit"}
            </button>
        </form>
    )
}
export default DialogForm