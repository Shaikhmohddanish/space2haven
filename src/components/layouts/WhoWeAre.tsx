import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Space2Haven</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Transforming spaces into havens through thoughtful design and meticulous execution.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2015, Space2Haven began with a simple mission: to create interior spaces that reflect the
              unique personalities and needs of our clients while maintaining the highest standards of design
              excellence.
            </p>
            <p className="text-muted-foreground">
              What started as a small studio has grown into a full-service interior design firm with a portfolio
              spanning residential, commercial, and hospitality projects across the country.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/about-hero.jpg"
              alt="Space2Haven studio"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 overflow-hidden rounded-lg md:order-1">
            <Image
              src="/portfolio-2.jpg"
              alt="Our design process"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 space-y-4 md:order-2">
            <h2 className="text-2xl font-bold">Our Approach</h2>
            <p className="text-muted-foreground">
              We believe that great design is both beautiful and functional. Our collaborative approach ensures that
              each project is tailored to our clients' lifestyle, preferences, and budget.
            </p>
            <p className="text-muted-foreground">
              From concept to completion, we handle every aspect of the design process with meticulous attention to
              detail, ensuring a seamless and enjoyable experience for our clients.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Alexandra Reynolds",
                role: "Principal Designer & Founder",
                image: "/testimonial-1.jpg",
              },
              {
                name: "Marcus Chen",
                role: "Senior Interior Designer",
                image: "/testimonial-3.jpg",
              },
              {
                name: "Sophia Williams",
                role: "Project Manager",
                image: "/testimonial-1.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 text-center">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px] object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/contact">
            <Button size="small">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
