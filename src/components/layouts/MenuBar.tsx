"use client";

import Link from "next/link";
import { Menubar } from "@/components/ui/menubar";
import { Admin } from "@/types";
import { usePathname } from "next/navigation";
import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import cn from "classnames";

type MenuItem = {
  option: string;
  link?: string;
  external?: boolean; // Add external property
  children?: { option: string; link: string }[];
};

const menuBarOptions: MenuItem[] = [
  { option: "Home", link: "/" },
  { option: "Interior", link: "https://interior.space2haven.com", external: true }, // Mark as external
  { option: "Properties", link: "/properties" },
  {
    option: "Calculators",
    children: [
      { option: "EMI Calculator", link: "/calculate-emi" },
      { option: "Loan Eligibility", link: "/loan-eligibility" },
    ],
  },
  { option: "About", link: "/about" },
];

const MenuBar = () => {
  const pathname = usePathname();
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const adminDetails = localStorage.getItem("adminDetails");
    setCurrentAdmin(adminDetails ? JSON.parse(adminDetails) : null);
  }, []);

  return (
    <Menubar className="max-md:hidden bg-transparent border-none flex items-center gap-6 relative z-50">
      {currentAdmin && <AdminMenu />}

      {menuBarOptions.map((item, index) => {
        const isDropdown = Array.isArray(item.children);

        if (isDropdown) {
          return (
            <div key={index} className="relative group">
              {/* Hover area includes both label and dropdown */}
              <div className="cursor-pointer text-sm font-semibold border-b-2 border-transparent group-hover:border-sand-soft px-1 py-2">
                {item.option}
              </div>

              <div
                className={cn(
                  "absolute top-full left-0 mt-1 min-w-[180px] z-50 bg-white shadow-md rounded-md flex-col py-2",
                  "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:flex transition-opacity duration-150"
                )}
              >
                {item.children?.map((child, i) => (
                  <Link
                  key={i}
                  href={child.link}
                  className={cn(
                    "px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap transition-colors duration-150 rounded-sm",
                    {
                      "bg-gray-100 font-semibold": pathname === child.link,
                    }
                  )}
                >
                  {child.option}
                </Link>
                
                ))}
              </div>
            </div>
          );
        }

        if (item.link) {
          if (item.external) {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-sm font-semibold border-b-2 duration-500 hover:border-b-sand-soft",
                  {
                    "border-b-sand-soft": pathname === item.link,
                    "border-b-transparent": pathname !== item.link,
                  }
                )}
              >
                {item.option}
              </a>
            );
          }
          return (
            <Link
              key={index}
              href={item.link}
              className={cn(
                "text-sm font-semibold border-b-2 duration-500 hover:border-b-sand-soft",
                {
                  "border-b-sand-soft": pathname === item.link,
                  "border-b-transparent": pathname !== item.link,
                }
              )}
            >
              {item.option}
            </Link>
          );
        }

        return null;
      })}
    </Menubar>
  );
};

export default MenuBar;
