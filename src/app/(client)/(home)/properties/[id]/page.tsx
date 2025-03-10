"use client";
import axios from "axios";
import { Admin, Property } from "@/types";
import { useEffect, useState } from "react";
import { DisplayCarousel, DialogBox, LoaderLayout, DynamicCarousel } from "@/components";
import { Check, Trash2, UserRoundPen } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const PropertyById = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { _id: id } = useParams();

    const [propertyData, setPropertyData] = useState<Property | null>(null);
    const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

    // 🏡 Fetch property details when component mounts
    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;
            setLoading(true);
            try {
                console.log("Fetching property data...");
                const response = await axios.get(`/api/properties?id=${id}`);
                const { matchingData, recommendedData } = response.data;

                setPropertyData(matchingData);
                setSimilarProperties(recommendedData);
            } catch (error) {
                console.error("Failed to fetch property data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    // 🔥 Delete Property
    const deleteProperty = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!id) return;

        setLoading(true);
        try {
            const response = await axios.delete(`/api/admin/delete-property/${id}`);
            toast({ description: response.data.msg });
            router.push("/properties");
        } catch (error) {
            console.error("Error deleting property:", error);
            toast({ description: "Something went wrong! Unable to delete" });
        } finally {
            setLoading(false);
        }
    };

    // Load admin details from localStorage
    useEffect(() => {
        const adminDetails = localStorage.getItem("adminDetails");
        setCurrentAdmin(adminDetails ? JSON.parse(adminDetails) : null);
    }, []);

    if (!propertyData) return <div className="min-h-screen flex-center text-2xl font-bold">Fetching Data...</div>;

    const {
        images,
        title = "Title",
        configuration = "1 BHK",
        area = "N/A",
        features = [],
        location = "Not specified",
        description = "No description available.",
        price = "N/A",
        address = { city: "", state: "" },
        possession = "N/A",
        developer = "N/A",
        url="N/A",
        updatedAt
    } = propertyData;

    return (
        <section className="min-h-screen w-full flex-center flex-col py-20 px-4 ">
            {loading ? (
                <LoaderLayout loaderType="single" />
            ) : (
                <>
                    {/* 🏡 Property Images Carousel */}
                    <div className="w-full max-w-6xl mb-10">
                        {images && <DisplayCarousel images={images} />}
                    </div>

                    {/* 📜 Property Details */}
                    <div className="w-full max-w-6xl space-y-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-xl lg:text-3xl font-bold text-left w-full text-home">{title || "Title"}</h1>

                            {currentAdmin && (
                                <div className="flex-center gap-2">
                                    <Link href={`/properties/${id}/update-property`}>
                                        <UserRoundPen size={20} color="green" />
                                    </Link>
                                    <Trash2 size={20} color="red" onClick={deleteProperty} className="cursor-pointer" />
                                </div>
                            )}
                        </div>

                        {/* 🔹 Basic Info */}
                        <div className="flex items-center justify-between">
                            <h2 className="md:text-lg font-semibold">Configuration: {configuration}</h2>
                            <h2 className="md:text-lg font-semibold">Area: {area || "N/A"}</h2>
                            <h1 className="font-bold text-xl">Price: ₹ {price || "N/A"}</h1>
                        </div>

                        {/* 🏠 Property Features */}
                        <div>
                            <h2 className="font-semibold">Amenities:</h2>
                            <ul className="flex items-center w-full text-sm gap-4 flex-wrap">
                                {features.length > 0 ? (
                                    features.map((feature, index) => (
                                        <li key={index} className="flex-center gap-1">
                                            <Check size={15} />
                                            <p className="text-gray-700">{feature}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-700">No features listed.</p>
                                )}
                            </ul>
                        </div>

                        {/* 📍 Location & Other Info */}
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-wrap gap-4 items-center text-lg">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold">Location: {location || "Not specified"}</h2> |
                                    <span className="text-xs font-semibold mt-1">
                                        {address.city},&nbsp;{address.state}
                                    </span>
                                </div>
                                
                            </div>
                            <p className="text-xs font-semibold text-grey-1">
                                Last Updated: <span>{moment(updatedAt).fromNow()}</span>
                            </p>
                        </div>

                        <hr className="w-full max-w-full my-4" />

                        {/* 📝 Property Description */}
                        <div>
                            <h1 className="text-xl font-semibold">About</h1>
                            <p className="text-grey-1 leading-relaxed">{description || "No description available."}</p>
                        </div>

                        {/* 📨 Contact Form */}
                        <div className="mt-8 w-full flex justify-center">
                            <DialogBox />
                        </div>
                    </div>
                </>
            )}

            {/* 🏘️ Recommended Properties */}
            <hr className="my-8 w-full max-w-4xl" />
            <div className="w-full max-w-6xl">
                <h1 className="text-2xl font-semibold mb-4 text-home">Recommended Properties</h1>
                <DynamicCarousel data={similarProperties} loading={loading} type="home-properties" />
            </div>
        </section>
    );
};

export default PropertyById;
