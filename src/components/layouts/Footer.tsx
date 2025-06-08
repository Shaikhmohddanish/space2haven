import Image from "next/image";
import Link from "next/link";
import { 
  PhoneCall, 
  Mail, 
  Instagram, 
  Youtube, 
  Facebook, 
  MessageCircle, 
  Chrome,
  MapPin,
  ArrowRight
} from "lucide-react";

const menuItems = [
  { option: "Home", link: "/" },
  { option: "Interior", link: "https://interior.space2haven.com", external: true },
  { option: "Properties", link: "/properties" },
  { option: "EMI Calculator", link: "/calculate-emi" },
  { option: "About", link: "/about" },
];

const quickLinks = [
  { label: "Privacy Policy", link: "/privacy-policy" },
  { label: "Terms & Conditions", link: "/terms" },
  { label: "Contact Us", link: "/contact" },
];

const socialLinks = [
  { Icon: Chrome, href: "https://www.google.com" },
  { Icon: Instagram, href: "https://www.instagram.com" },
  { Icon: Youtube, href: "https://www.youtube.com" },
  { Icon: Facebook, href: "https://www.facebook.com" },
  { Icon: MessageCircle, href: "https://wa.me/918976511551" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white/5 p-2.5">
                <Image 
                  src="/logo.svg"
                  alt="Space2Heaven"
                  fill
                  className="object-contain transition group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white">Space2Heaven</h3>
                <span className="text-xs text-gray-400">Real Estate & Interior Design</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Creating spaces that inspire and elevate your lifestyle. We specialize in premium real estate solutions and luxurious interior designs.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map(({ Icon, href }, index) => (
                <Link 
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-1 gap-3">
              {menuItems.map((item, index) => (
                item.external ? (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={16} className="mr-2 transition-transform group-hover:translate-x-1" />
                    <span>{item.option}</span>
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={item.link}
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight size={16} className="mr-2 transition-transform group-hover:translate-x-1" />
                    <span>{item.option}</span>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <ArrowRight size={16} className="mr-2 transition-transform group-hover:translate-x-1" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  4th Floor, Zenia Building,<br />
                  Hiranandani Business Park, Thane
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall size={20} className="text-gray-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm">+91 897 651 1551</p>
                  <p className="text-sm">+91 828 698 4597</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400 flex-shrink-0" />
                <p className="text-sm">Hello@space2heaven.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Space2Heaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
