import { HomeBanner, PropertyPane, Services, GetInTouchForm } from "@/components"
import CityProjects from "@/components/layouts/CityProjects"
import ImageSlider from "@/components/layouts/ImageSlider"
import WhoWeAre from "@/components/layouts/WhoWeAre"
import { services } from "@/constants"

const Home = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col lightGray">
      <HomeBanner bannerType="main" />
      <WhoWeAre/>
      <Services data={services} title="Our Services" subtitle="We're good at our services"/>
      <ImageSlider />
      <CityProjects/>
      <GetInTouchForm />
    </section>
  )
}
export default Home