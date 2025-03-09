import { HomeBanner, PropertyPane, Services, GetInTouchForm } from "@/components"
import CityProjects from "@/components/layouts/CityProjects"
import NewProjects from "@/components/layouts/NewProjects"
import WhoWeAre from "@/components/layouts/WhoWeAre"
import { services } from "@/constants"

const Home = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col bg-sand-soft">
      <HomeBanner bannerType="main" />
      <WhoWeAre/>
      <Services data={services} title="Our Services"/>
      <PropertyPane contentType="home-interior" />
      <PropertyPane contentType="home-properties" />
      <GetInTouchForm />
      <CityProjects/>
      <NewProjects/>
    </section>
  )
}
export default Home