"use client";

import { useEffect, useState } from "react";
import { cityOptions } from "@/constants";
import { useToast } from "@/hooks/use-toast";

const SelectLocations = () => {

    const { toast } = useToast()
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    useEffect(() => {
        const storedLocations = localStorage.getItem("locationDropdown");
        if (storedLocations) {
            try {
                const parsedLocations = JSON.parse(storedLocations);
                if (Array.isArray(parsedLocations)) {
                    setSelectedValues(parsedLocations);
                }
            } catch (error) {
                console.error("Error parsing stored locations:", error);
            }
        }
    }, []);

    const handleCheckboxChange = (value: string) => {
        setSelectedValues((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleLocations = () => {
        localStorage.setItem("locationDropdown", JSON.stringify(selectedValues))
        toast({
            description: "Locations have added"
        })
    }

    return (
        <div className="flex flex-col items-center bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Select Your Locations
                </h1>

                <div className="flex flex-col gap-3 h-[200px] overflow-y-scroll">
                    {cityOptions.map(({ label, value }) => (
                        <label
                            key={value}
                            className="flex items-center space-x-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                value={value}
                                checked={selectedValues.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                                className="w-5 h-5 text-blue-500 rounded-md border-gray-300 focus:ring-blue-500"
                                aria-label={`Select ${label}`}
                            />
                            <span className="text-gray-700">{label}</span>
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleLocations}
                    className="m-0 w-full btn-class"
                    disabled={selectedValues.length === 0}
                >
                    Add
                </button>
                {/* Render Selected Values */}
                {selectedValues.length > 0 && (
                    <div className="mt-4 flex items-start flex-wrap gap-2 max-h-[200px] overflow-y-scroll">
                        {selectedValues.map((value) => {
                            const label = cityOptions.find((option) => option.value === value)?.label;
                            return (
                                <span
                                    key={value}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm"
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectLocations;
