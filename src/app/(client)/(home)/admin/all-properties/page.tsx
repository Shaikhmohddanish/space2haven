"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/utils/formatPrice";

const AllProperties = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminDetails, setAdminDetails] = useState<string | null>(null);

  useEffect(() => {
    const storedAdminDetails = localStorage.getItem("adminDetails");
    setAdminDetails(storedAdminDetails);
    fetchProperties();
  }, []);

  // ✅ Fetch Properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      setProperties(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("🛠 Delete function triggered for ID:", id);
  
    if (!adminDetails) {
      toast({ description: "You are not authorized to delete properties!" });
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;
  
    try {
      console.log("🚀 Sending DELETE request to API with ID:", id);
      const response = await axios.delete(`/api/admin/delete-property/${id}`);
  
      console.log("✅ Response:", response);
  
      if (response.status === 200) {
        console.log("✅ Property deleted successfully!");
        toast({ description: "Property deleted successfully!" });
  
        // ✅ Remove the deleted property from state
        setProperties((prev) => prev.filter((property) => property._id !== id));
      } else {
        console.log("❌ Server responded with error:", response.data.error);
        toast({ description: response.data.error || "Failed to delete property. Please try again." });
      }
    } catch (error) {
      console.error("❌ Error deleting property:", error);
      toast({ description: "Failed to delete property. Server error." });
    }
  };
  

  return (
    <section className="min-h-screen py-24 px-4 bg-sand-soft flex-center flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-home text-center">
        All Properties
      </h1>
      <hr className="max-w-xl w-full h-1 bg-home my-4" />

      {/* Properties Table */}
      <div className="mt-8 w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-home">Property List</h2>

        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Title</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Location</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{property.title}</td>
                    <td className="border border-gray-300 p-2">₹{formatPrice(property.price)}</td>
                    <td className="border border-gray-300 p-2">{property.location}</td>
                    <td className="border border-gray-300 p-2 flex gap-2">
                      <Link
                        href={`/admin/edit-property/${property._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      {adminDetails && (
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProperties;
