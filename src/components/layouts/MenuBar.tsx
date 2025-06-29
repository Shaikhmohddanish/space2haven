"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import cn from "classnames";

type MenuItem = {
  option: string;
  link?: string;
  external?: boolean;
  children?: { option: string; link: string }[];
};

const menuBarOptions: MenuItem[] = [
  { option: "Home", link: "/" },
  { option: "Interior", link: "https://interior.space2haven.com", external: true },
  { option: "Properties", link: "/properties" },
  { option: "Blog", link: "/blog" },
  {
    option: "Calculators",
    children: [
      { option: "EMI Calculator", link: "/calculate-emi" },
      { option: "Loan Eligibility", link: "/loan-eligibility" },
    ],
  },
  { option: "About", link: "/about" },
  {
    option: "Legal",
    children: [
      { option: "Privacy Policy", link: "/privacy-policy" },
      { option: "Terms & Conditions", link: "/terms" },
      { option: "Contact Us", link: "/contact" },
    ],
  },
];

const MenuBar = () => {
  const pathname = usePathname();
  const [currentAdmin, setCurrentAdmin] = useState<any | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const adminDetails = localStorage.getItem("adminDetails");
    setCurrentAdmin(adminDetails ? JSON.parse(adminDetails) : null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown(activeDropdown === index ? null : index);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  }, [activeDropdown]);

  return (
    <nav 
      className="max-md:hidden flex items-center gap-2 relative z-50"
      role="navigation"
      aria-label="Main menu"
    >
      {menuBarOptions.map((item, index) => {
        const isDropdown = Array.isArray(item.children);
        const isActive = pathname === item.link;

        if (isDropdown) {
          return (
            <div key={index} className="relative group">
              <button
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg",
                  "transition-all duration-200",
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-gray-100 hover:bg-white/10",
                  {
                    "bg-white/10 text-white": activeDropdown === index,
                  }
                )}
                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={activeDropdown === index}
                aria-haspopup="true"
              >
                {item.option}
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    { "rotate-180": activeDropdown === index }
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 mt-1 min-w-[200px] rounded-lg",
                  "bg-black/80 backdrop-blur-md border border-white/10",
                  "transform transition-all duration-200 origin-top-left",
                  {
                    "opacity-100 scale-100 visible": activeDropdown === index,
                    "opacity-0 scale-95 invisible": activeDropdown !== index,
                  }
                )}
                role="menu"
                aria-orientation="vertical"
              >
                {item.children?.map((child, i) => (
                  <Link
                    key={i}
                    href={child.link}
                    className={cn(
                      "block px-4 py-2.5 text-sm text-gray-300",
                      "hover:bg-white/10 hover:text-white",
                      "transition-colors duration-150",
                      "first:rounded-t-lg last:rounded-b-lg",
                      {
                        "bg-white/10 text-white font-medium": pathname === child.link,
                      }
                    )}
                    role="menuitem"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {child.option}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        if (item.link) {
          const LinkComponent = item.external ? 'a' : Link;
          const linkProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

          return (
            <LinkComponent
              key={index}
              href={item.link}
              {...linkProps}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "transition-all duration-200",
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-100 hover:bg-white/10",
                {
                  "bg-white/10 text-white": isActive,
                }
              )}
              role="menuitem"
            >
              {item.option}
            </LinkComponent>
          );
        }

        return null;
      })}
    </nav>
  );
};

export default MenuBar;
