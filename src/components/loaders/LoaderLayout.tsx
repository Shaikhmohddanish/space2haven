import { Skeleton } from "@/components/ui/skeleton"

const LoaderLayout = ({ loaderType = "all" }: { loaderType?: string }) => {

    return (
        <>{loaderType === "single" ?
            <section className="min-h-screen w-full flex-center flex-col my-20 px-4">

                <div className="w-full max-w-6xl mb-10 h-[300px] md:h-[400px] lg:h-[500px]">
                    <Skeleton className="w-full h-full" />
                </div>

                <div className="w-full max-w-6xl space-y-6 bg-white p-6 rounded-lg shadow-md">

                    <Skeleton className="h-8 w-full" />
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>

                    <Skeleton className="h-8 w-full" />

                    <div className="flex flex-wrap gap-4 items-center text-lg">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>

                    <hr className="my-4" />

                    {/* Property Description */}
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    {/* Form Dialog Box component */}
                    <div className="mt-8 w-full flex justify-center">
                        <button className="btn-class">Get in touch</button>
                    </div>
                </div>

            </section>
            :
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 items-center justify-center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="property-card-styles rounded-lg shadow-lg border border-gray-200" />
                ))}
            </div>
        }
        </>
    )
}
export default LoaderLayout