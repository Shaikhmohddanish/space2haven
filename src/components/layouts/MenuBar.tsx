"use client"
import Link from "next/link";
import { menuBarOptions } from "@/constants";
import { Menubar } from "@/components/ui/menubar";
import { Admin } from "@/types";
import { usePathname } from "next/navigation";
import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";

const MenuBar = () => {
    const pathname = usePathname()
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)

    useEffect(() => {
        const adminDetails = localStorage.getItem("adminDetails");
        setCurrentAdmin(adminDetails ? JSON.parse(adminDetails) : null);
    }, []);
    
    return (
        <Menubar className="max-md:hidden bg-transparent border-none flex items-center gap-4">

            {currentAdmin && <AdminMenu />}

            {menuBarOptions.map(({ option, link }, index) => (
                <Link key={index} href={link}
                    className={`text-sm font-semibold border-b-2 duration-500 hover:border-b-sand-soft ${pathname === link ? "border-b-sand-soft" : "border-b-transparent"}`}
                >{option}</Link>
            ))}

            {/* About Link as a Separate Menu */}
        </Menubar>
    );
};

export default MenuBar;
