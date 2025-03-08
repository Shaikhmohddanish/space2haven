import { HomeBanner, PropertyPane, Services, GetInTouchForm } from "@/components"
import { services } from "@/constants"

const Home = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col bg-sand-soft">
      <HomeBanner bannerType="main" />
      <Services data={services} title="Our Services"/>
      <PropertyPane contentType="home-interior" />
      <PropertyPane contentType="home-properties" />
      <GetInTouchForm />
    </section>
  )
}
export default Home