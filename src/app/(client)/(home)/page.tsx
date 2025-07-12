import { HomeBanner, Services, GetInTouchForm } from "@/components"
import CityProjects from "@/components/layouts/CityProjects"
import ImageSlider from "@/components/layouts/ImageSlider"
import InsightsTabs from "@/components/layouts/InsightsTabs"
import WhoWeAre from "@/components/layouts/WhoWeAre"
import JsonLd from "@/components/JsonLd"
import { services } from "@/constants"
import { generateOrganizationSchema } from "@/lib/seo-utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Space2Heaven | Your Trusted Real Estate Partner",
  description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
  keywords: ["real estate", "property", "buy home", "sell home", "rent apartment", "luxury properties", "Mumbai real estate", "affordable housing"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Space2Heaven | Your Trusted Real Estate Partner",
    description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
    url: "/",
    siteName: "Space2Heaven",
    images: [
      {
        url: "/images/homeBanner.webp",
        width: 1200,
        height: 630,
        alt: "Space2Heaven - Premium Real Estate Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space2Heaven | Your Trusted Real Estate Partner",
    description: "Find your perfect space with Space2Heaven – your trusted partner in buying and selling properties tailored just for you.",
    images: ["/images/homeBanner.webp"],
  },
}

const Home = () => {
  const schemaData = generateOrganizationSchema();
  
  return (
    <section className="w-full min-h-screen flex-center flex-col lightGray">
      <JsonLd data={schemaData} />
      <HomeBanner bannerType="main" />
      <WhoWeAre/>
      <InsightsTabs />
      <CityProjects/>
      <GetInTouchForm />
    </section>
  )
}
export default Home