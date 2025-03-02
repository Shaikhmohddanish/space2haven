import Image from "next/image";
import Link from "next/link";
import { Globe, PhoneCall, Mail } from "lucide-react";
import { menuBarOptions } from "@/constants";

const Footer = () => {
  return (
    <section className="min-h-[40vh] bg-gray-800 text-sand-soft2 py-8 bg-[url(/images/pattern.png)]">
      <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 relative">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo Section */}
          <div className="items-start flex-center md:justify-start gap-4">
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
              <h1 className="text-2xl font-bold">Space2Heaven</h1>
            </Link>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-8">
            {menuBarOptions.map(({ option, link }, index) => (
              <Link key={index} href={link}
                className="text-sm font-semibold border-b-2 duration-500 border-b-transparent hover:border-b-sand-soft"
              >{option}</Link>
            ))}
          </div>

          {/* Contact Details Section */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4 text-center md:text-right">
              <p className="text-sm text-gray-400 leading-tight">
                4th Floor, Zenia Building, <br />
                Hiranandani Business Park, Thane
              </p>
              <Globe size={20} className="hidden md:inline-block" />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p>+91 897 651 1551</p>
                <p>+91 828 698 4597</p>
              </div>
              <PhoneCall size={20} className="hidden md:inline-block" />
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm">Hello@space2heaven.com</p>
              <Mail size={20} className="hidden md:inline-block" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Space2Heaven. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
