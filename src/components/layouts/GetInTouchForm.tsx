import Image from "next/image"
import DialogForm from "./DialogForm"

const GetInTouchForm = ({ pageType }: { pageType?: string }) => {
  return (
    <section className="relative overflow-hidden mb-8 mx-4 my-4">
      
      <div className="flex-center gap-2 flex-col mb-6">
      <h1 className={`header-class text-black`}>  Get in Touch
      </h1>
      <hr className='darkBrown' />
      </div>
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