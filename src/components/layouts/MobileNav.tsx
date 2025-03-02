"use client"
import cn from 'classnames'
import Link from "next/link"
import Image from "next/image"
import { Admin } from '@/types'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HomeIcon, Calculator, Sofa, Info, MapPinHouse, Menu, UserRoundCog, LogOut } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

const MobileNav = () => {

    const router = useRouter();
    const { toast } = useToast();
    const pathname = usePathname()
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)

    const sidebarLinks = [
        {
            route: "/",
            label: "Home",
            logo: <HomeIcon size={20} />,
        },
        {
            route: "/properties",
            label: "Properties",
            logo: <MapPinHouse size={20} />,
        },
        {
            route: "/interior",
            label: "Interior",
            logo: <Sofa size={20} />,
        },
        {
            route: "/calculate-emi",
            label: "EMI Calculator",
            logo: <Calculator size={20} />,
        },
        {
            route: "/about",
            label: "About",
            logo: <Info size={20} />,
        }
    ]

    useEffect(() => {
        const adminDetails = localStorage.getItem("adminDetails");
        setCurrentAdmin(adminDetails ? JSON.parse(adminDetails) : null);
    }, []);

    const adminLogout = async () => {
        try {
            await axios.post("/api/auth/admin/signout");
            localStorage.removeItem("adminDetails");
            setCurrentAdmin(null);
            toast({
                description: "Sign out successful!",
            });
            router.push("/");
        } catch (error) {
            toast({
                description: "Sign out failed!",
            });
            console.error("Logout error:", error);
        }
    };
    
    return (
        <section
            className="w-full flex-center max-md:flex hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu size={20} />
                </SheetTrigger>
                <SheetContent
                    className={`border-none px-0 pb-0 ${pathname==="/interior" ?  "bg-interior"  : "bg-home"} bg-[url(/images/pattern.png)]`}
                >
                    <Link href="/" className="flex items-center gap-2 px-4 pb-4">
                        <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading='eager'
                            src="/logo.svg"
                            alt="HN"
                            width={32}
                            height={32}
                            className="max-sm:size-10"
                        />
                        <h1 className={`text-2xl font-bold ${pathname==="/interior" ?  "text-sand-soft2"  : "text-sand-soft"}`}>Space2Heaven</h1>
                    </Link>

                    <div className="mobile-menu bg-sand-soft px-4">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 mt-4">
                                {sidebarLinks.map(({ route, logo, label }, index) => {
                                    const isActive = pathname === route;
                                    return (
                                        <SheetClose asChild key={index}>
                                            <Link
                                                href={route}
                                                className={cn("menu-link w-full", {
                                                     "bg-grey-1 text-sand-soft": isActive })}
                                            >
                                                {logo}
                                                <p className="font-semibold">
                                                    {label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                                {currentAdmin &&
                                    <>
                                        <Link
                                            href={"/admin/dashboard"}
                                            className={cn("menu-link w-full", { "bg-grey-1 text-sand-soft": pathname === "/admin/dashboard" })}
                                        >
                                            <UserRoundCog size={20} />
                                            <p className="font-semibold">
                                                Admin Dashboard
                                            </p>

                                        </Link>
                                        <button
                                            onClick={adminLogout}
                                            className="menu-link w-full hover:bg-grey-1 hover:text-sand-soft duration-300"
                                        >
                                            <LogOut size={20} />
                                            <p className="font-semibold">
                                                Sign Out
                                            </p>

                                        </button>
                                    </>
                                }
                            </section>

                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
export default MobileNav