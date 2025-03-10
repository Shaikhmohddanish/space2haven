import Image from "next/image";
import Link from "next/link";
import { Globe, PhoneCall, Mail, Instagram, Youtube, Facebook, MessageCircle, Linkedin, Chrome } from "lucide-react";
import { menuBarOptions } from "@/constants";

const Footer = () => {
  return (
    <section className="min-h-[50vh] bg-gray-800 text-sand-soft2 py-8">
      <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 relative">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading='eager'
                src="/logo.svg"
                alt="Space2Heaven"
                width={50}
                height={50}
                className="max-sm:size-10"
              />
              <h1 className="text-2xl font-bold text-sand-soft2">Space2Heaven</h1>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Creating spaces that inspire and elevate your lifestyle.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-8">
            {menuBarOptions.map(({ option, link }, index) => (
              <Link 
                key={index} 
                href={link}
                className="text-sm font-semibold border-b-2 duration-500 border-b-transparent hover:border-b-sand-soft text-sand-soft2"
              >
                {option}
              </Link>
            ))}
          </div>

          {/* Contact Details Section */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4 text-center md:text-right">
              <p className="text-sm text-gray-400 leading-tight">
                4th Floor, Zenia Building, <br />
                Hiranandani Business Park, Thane
              </p>
              <Globe size={20} className="hidden md:inline-block text-sand-soft2" />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p>+91 897 651 1551</p>
                <p>+91 828 698 4597</p>
              </div>
              <PhoneCall size={20} className="hidden md:inline-block text-sand-soft2" />
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm">Hello@space2heaven.com</p>
              <Mail size={20} className="hidden md:inline-block text-sand-soft2" />
            </div>
          </div>
        </div>

        {/* 🟢 Social Media Links Section */}
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-lg font-semibold text-sand-soft2 mb-4">Connect with us</h2>
          <div className="flex gap-6">
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-sand-soft2 hover:text-white transition">
              <Chrome size={24} />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-sand-soft2 hover:text-white transition">
              <Instagram size={24} />
            </Link>
            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-sand-soft2 hover:text-white transition">
              <Youtube size={24} />
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-sand-soft2 hover:text-white transition">
              <Facebook size={24} />
            </Link>
            <Link href="https://wa.me/918976511551" target="_blank" rel="noopener noreferrer" className="text-sand-soft2 hover:text-white transition">
              <MessageCircle size={24} />
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-sand-soft2">
            © {new Date().getFullYear()} Space2Heaven. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
