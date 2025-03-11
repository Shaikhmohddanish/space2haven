import { HomeBanner, PropertyPane, Services, GetInTouchForm, InteriorLayout } from "@/components"
import AdvancedImageSlider from "@/components/layouts/AdvancedImageSlider"
import ComparisonTable from "@/components/layouts/ComparisonTable"
import FancyImageViewer from "@/components/layouts/FancyImageViewer"
import ImageSlider from "@/components/layouts/ImageSlider"
import { services } from "@/constants"

const Interior = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col bg-sand-soft2">
      <HomeBanner bannerType="interior" />
      <InteriorLayout />
      <PropertyPane contentType="interior-self-intro" />
      <ImageSlider/>
      <AdvancedImageSlider/>
      <FancyImageViewer/>
      <GetInTouchForm pageType={"interior"} />
      <ComparisonTable/>
    </section>
  )
}
export default Interior