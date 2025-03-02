"use client";

import { LayoutDashboard, LogOut, UserRoundCog, ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Admin } from "@/types";

const AdminMenu = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adminDetails = localStorage.getItem("adminDetails");
        if (adminDetails) {
            try {
                const parsedAdmin = JSON.parse(adminDetails);
                setCurrentAdmin(parsedAdmin || null);
            } catch (error) {
                console.error("Error parsing adminDetails:", error);
                setCurrentAdmin(null);
            }
        }
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const closeDropdown = () => setIsDropdownOpen(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const adminLogout = async () => {
        try {
            await axios.post("/api/auth/admin/signout");
            localStorage.removeItem("adminDetails");
            setCurrentAdmin(null);
            toast({ description: "Sign out successful!" });
            router.push("/");
            closeDropdown();
        } catch (error) {
            toast({ description: "Sign out failed!" });
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Admin Actions Menu */}
            {currentAdmin && (
                <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
                    <UserRoundCog size={20} />
                    <h1 className="menu-link font-medium">
                        {currentAdmin?.name ? currentAdmin.name.split(" ")[1] || currentAdmin.name : "Admin"}
                    </h1>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    />
                </div>
            )}
            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50 overflow-hidden animate-fade-in text-sm">
                    <Link
                        href="/admin/dashboard"
                        className="w-full block px-4 py-2 hover:bg-gray-100 text-home items-center gap-2"
                        onClick={closeDropdown}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <button
                        onClick={adminLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-home flex items-center gap-2"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminMenu;
