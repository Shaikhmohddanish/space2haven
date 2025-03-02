import { HomeBanner, PropertyPane, Services, GetInTouchForm, InteriorLayout } from "@/components"
import { services } from "@/constants"

const Interior = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col bg-sand-soft2">
      <HomeBanner bannerType="interior" />
      <InteriorLayout />
      <PropertyPane contentType="interior-self-intro" />
      <GetInTouchForm pageType={"interior"} />
      <Services data={services} title="Our Services" bgClassName="bg-gradient-to-b from-interior to-gray-800" />
    </section>
  )
}
export default Interior