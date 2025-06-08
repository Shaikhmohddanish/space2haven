'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  Calculator,
  Sofa,
  Info,
  MapPinHouse,
  Menu,
  ChevronDown,
  X as CloseIcon,
  FileText,
  Phone
} from 'lucide-react';

const menuItems = [
  {
    route: '/',
    label: 'Home',
    icon: <HomeIcon size={20} />,
  },
  {
    route: 'https://interior.space2haven.com',
    label: 'Interior',
    icon: <Sofa size={20} />,
    external: true,
  },
  {
    route: '/properties',
    label: 'Properties',
    icon: <MapPinHouse size={20} />,
  },
  {
    label: 'Calculators',
    icon: <Calculator size={20} />,
    children: [
      { route: '/calculate-emi', label: 'EMI Calculator' },
      { route: '/loan-eligibility', label: 'Loan Eligibility' },
    ],
  },
  {
    route: '/about',
    label: 'About',
    icon: <Info size={20} />,
  },
  {
    label: 'Legal',
    icon: <FileText size={20} />,
    children: [
      { route: '/privacy-policy', label: 'Privacy Policy' },
      { route: '/terms', label: 'Terms & Conditions' },
      { route: '/contact', label: 'Contact Us' },
    ],
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Mobile Menu */}
      <div 
        className={`
          fixed inset-0 z-[99999]
          ${isOpen ? 'visible' : 'invisible pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div 
          className={`
            fixed inset-0 bg-black/60 backdrop-blur-sm
            transition-opacity duration-200
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div 
          className={`
            fixed top-0 right-0 w-[280px] h-[100dvh]
            bg-gray-900/95 backdrop-blur-md
            transform transition-transform duration-300 ease-out
            overflow-hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/95 backdrop-blur-md">
            <Link 
              href="/" 
              className="flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="Space2Heaven"
                  fill
                  className="object-contain"
                  sizes="32px"
                  priority
                />
              </div>
              <span className="text-lg font-bold text-white">Space2Heaven</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="overflow-y-auto overscroll-contain h-[calc(100dvh-64px)]">
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                if (item.children) {
                  const isDropdownOpen = activeDropdown === item.label;
                  return (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() => setActiveDropdown(isDropdownOpen ? null : item.label)}
                        className="flex items-center justify-between w-full p-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                        aria-expanded={isDropdownOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white/70">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-white/70 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`pl-11 space-y-1 overflow-hidden transition-all duration-200 ${
                          isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.route}
                            className="block p-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const LinkComponent = item.external ? 'a' : Link;
                return (
                  <LinkComponent
                    key={index}
                    href={item.route}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg text-white
                      hover:bg-white/10 transition-colors
                      ${pathname === item.route ? 'bg-white/10' : ''}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`text-white/70 ${pathname === item.route ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </LinkComponent>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
