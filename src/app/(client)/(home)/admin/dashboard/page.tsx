"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const router = useRouter();
  const [adminDetails, setAdminDetails] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAdminDetails = localStorage.getItem("adminDetails");
    setAdminDetails(storedAdminDetails);
    if (!storedAdminDetails) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      fetchProperties(); // Fetch properties only if admin is logged in
    }
  }, [router]);

  // ✅ Fetch Properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      setProperties(response.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="min-h-screen py-24 px-4 bg-sand-soft flex-center flex-col bg-[url(/images/pattern.png)]">
      {adminDetails ? (
        <>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-home text-center">
            Admin Dashboard
          </h1>
          <hr className="max-w-xl w-full h-1 bg-home my-4" />

          {/* Dashboard Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-7xl">
            {dashboardData.map(({ link, title, color, hover }, index) => (
              <Link
                href={link}
                key={index}
                className={`${color} hover:${hover} transition duration-200 dashboard-card flex-center text-center p-4 rounded-lg text-sand-soft font-bold bg-[url(/images/pattern.png)]`}
              >
                {title}
              </Link>
            ))}
          </div>

         
        </>
      ) : (
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-home">Access Denied..!</h1>
      )}
    </section>
  );
};

export default Dashboard;

export const dashboardData = [
  {
    link: "/admin/add-property",
    title: "Add Property",
    color: "bg-red-500",
    hover: "bg-red-600",
  },
  {
    link: "/admin/add-interior",
    title: "Add Interior",
    color: "bg-blue-500",
    hover: "bg-blue-600",
  },
  {
    link: "/admin/all-properties",
    title: "All Properties",
    color: "bg-emerald-500",
    hover: "bg-emerald-600",
  },
];
