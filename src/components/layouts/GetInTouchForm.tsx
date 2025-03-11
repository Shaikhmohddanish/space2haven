import Image from "next/image"
import DialogForm from "./DialogForm"

const GetInTouchForm = ({ pageType }: { pageType?: string }) => {
  return (
    <section className="get-in-touch relative overflow-hidden min-h-screen ">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-darkBrown">
      Get in Touch
      </h2>
      <hr className="darkBrown"/>
      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-4">
        {/* Image Section */}
        <div className="relative w-full lg:w-3/5 rounded-lg overflow-hidden flex-center">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            loading='eager'
            src="/images/formbanner.webp"
            alt="Form Banner"
            width={801}
            height={410}
            className="object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/5">
          <DialogForm />
        </div>
      </div>
    </section>

  )
}
export default GetInTouchForm