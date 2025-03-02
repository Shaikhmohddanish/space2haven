import Image from "next/image";
import { useMemo } from "react";
import SearchWithRecommendations from "@/components/SearchWithRecommendations";

const HomeBanner = ({ bannerType }: { bannerType: string }) => {
    const bannerSrc = useMemo(
        () => bannerType === "main"
            ? "/images/homeBanner.webp"
            : "/images/interiorBanner.webp",
        [bannerType]
    );

    const headerText = useMemo(
        () => bannerType === "main"
            ? "Welcome to Space2Heaven"
            : "Transform to Elegant Interiors",
        [bannerType]
    );

    const descriptionText = useMemo(
        () => bannerType === "main"
            ? "Find your perfect home with ease and trust."
            : "Discover designs that blend style and comfort",
        [bannerType]
    );

    return (
        <section className="relative w-full min-h-96 lg:min-h-screen overflow-hidden">
            <Image
                sizes="100vw"
                loading="eager"
                src={bannerSrc}
                alt="Banner"
                fill
                priority
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex-center bg-black bg-opacity-20 flex-col gap-3">
                <div className="text-center px-4">
                    <h1 className="header-class leading-snug md:leading-relaxed">
                        {headerText}
                    </h1>
                    <p className="mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-300 leading-8">
                        {descriptionText}
                    </p>
                </div>

                {/* ✅ Show Search Bar only on Home Page (NOT Interior Page) */}
                {bannerType === "main" && <SearchWithRecommendations page={"home"} />}
            </div>
        </section>
    );
};

export default HomeBanner;
