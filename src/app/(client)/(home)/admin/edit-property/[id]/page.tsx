"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { cityOptions } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { Option, PropertyFormValues } from "@/types";

const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
  try {
      const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload-image", {
              method: "POST",
              body: formData,
          });

          const data = await response.json();

          if (response.ok && data.url) {
              return data.url;
          } else {
              console.error("❌ Error uploading to Cloudinary:", data.error);
              return "";
          }
      });

      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls.filter((url) => url !== "");  // ✅ Filter out empty URLs
  } catch (error) {
      console.error("❌ Error uploading images:", error);
      return [];
  }
};



const EditProperty: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<Option[]>([]);
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<PropertyFormValues>({
    title: "",
    images: [],
    configuration: [],
    description: "",
    price: 0,
    location: "",
    address: { city: "", state: "" },
    propertyType: "",
    area: "",
    yearBuilt: new Date().getFullYear(),
    features: [],
    recommend: false,
    possession: "",
    developer: "",
  });

  // ✅ Fetch Property Details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties?id=${id}`);
        const property = response.data.matchingData;

        setExistingImages(property.images || []);
        setFormData({
          ...property,
          images: [],
        });
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching property:", error);
        toast({ description: "Failed to load property details" });
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id, toast]);

  // ✅ Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && name === "images" && files) {
      const selectedFiles = Array.from(files);
      const validFiles = selectedFiles.filter((file) => file.size <= 500 * 1024);
      setFormData((prevData) => ({
        ...prevData,
        images: validFiles.slice(0, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof PropertyFormValues]: value,
      }));
    }
  };

  // ✅ Handle Multi-Select Fields Safely
const handleMultiSelectChange = (name: keyof PropertyFormValues, value: string | File) => {
    const currentField = formData[name];
    
    if (Array.isArray(currentField)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: currentField.includes(value as any)
          ? currentField.filter((item) => item !== value)
          : [...currentField, value],
      }));
    }
  };
  
  

  // ✅ Handle Deleting Existing Images
  const handleDeleteExistingImage = (url: string) => {
    setExistingImages((prevImages) => prevImages.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let imageUrls: string[] = [];

    // ✅ Upload new images to Cloudinary if they exist
    if (Array.isArray(formData.images) && formData.images.length > 0) {
        imageUrls = await uploadImagesToCloudinary(formData.images as File[]);
    }

    // ✅ Combine existing images with new uploaded images
    const allImageUrls = [...existingImages, ...imageUrls];

    // ✅ Prepare form data with image URLs
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof PropertyFormValues];
        if (key !== "images" && value !== undefined) {
            form.append(key, typeof value === "string" ? value.trim() : JSON.stringify(value));
        }
    });

    // ✅ Append combined image URLs to form data
    if (allImageUrls.length > 0) {
        allImageUrls.forEach((url) => form.append("images", url));
    } else {
        console.error("❌ No images uploaded or images array is empty!");
    }

    try {
        const response = await axios.put(`/api/admin/update-property/${id}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        toast({ description: response.data.msg });
        router.push("/admin/all-properties");
    } catch (error: any) {
        console.error("❌ Error updating property:", error);
        toast({
            description: error?.response?.data?.error || "Failed to update property",
        });
    } finally {
        setLoading(false);
    }
};


  // ✅ Center Loading Message
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading property details...</p>
      </div>
    );

  return (
    <section className="min-h-screen flex-center py-24 px-4 bg-gray-100 flex-col gap-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:max-w-2xl bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-home font-semibold text-xl text-center">Edit Property</h1>
        <hr />


        <div className="col-span-full">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-class w-full"
            placeholder="Name of property..."
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium mb-1">Developer</label>
          <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            required
            className="input-class w-full"
            placeholder="Type Developer name..."
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-class w-full"
            placeholder="Type description..."
          />
        </div>

        {/* Manage Existing Images */}
        <div className="flex flex-wrap gap-2">
          {existingImages.map((url) => (
            <div key={url} className="relative">
              <img src={url} alt="Property" className="w-20 h-20 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleDeleteExistingImage(url)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-full">
          <label className="block font-medium mb-1">Images (up to 10, max 500 KB each)</label>
          <input
            type="file"
            name="images"
            multiple
            accept=".jpg, .jpeg, .png, .webp, .avif"
            onChange={handleChange}
            className="input-class w-full"
          />
        </div>
        
        <label className="block font-medium mb-1">Configuration (BHK)</label>
        <div className="flex flex-wrap gap-2">
  {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bhk) => (
    <label key={bhk} className="flex items-center gap-2">
      <input
        type="checkbox"
        value={bhk}
        checked={formData.configuration.includes(bhk)}
        onChange={(e) => {
          setFormData((prevData) => ({
            ...prevData,
            configuration: e.target.checked
              ? [...prevData.configuration, bhk] // ✅ Add new selection
              : prevData.configuration.filter((item) => item !== bhk) // ✅ Remove if unchecked
          }));
        }}
      />
      {bhk}
    </label>
  ))}
</div>

        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-class w-full"
                      placeholder="Area name"
                    />
                  </div>
        
                  <div>
                  <label className="block font-medium mb-1">City</label>
<select
    name="city"
    value={formData.address.city}
    onChange={(e) =>
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                city: e.target.value,
            },
        }))
    }
    required
    className="input-class w-full"
>
    <option value="" disabled>
        Select City
    </option>
    {cityOptions.map(({ label, value }) => (
        <option key={value} value={value}>
            {label}
        </option>
    ))}
</select>


            </div>

            {/* State */}
            <div>
                <label className="block font-medium mb-1">State</label>
                <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    readOnly
                    className="input-class w-full bg-gray-100"
                />
            </div>                </div>

                <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="input-class w-full"
            >
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Villa">Villa</option>
              <option value="Plots">Plots</option>
            </select>

          </div>

          <div>
            <label className="block font-medium mb-1">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="input-class w-full"
              placeholder="1000 sq.ft"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Year Built</label>
            <input
              type="number"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              required
              className="input-class w-full"
            />
          </div>
        </div>

        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Input */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-class w-full"
            />
          </div>
          

          {/* Possession Dropdown */}
          <div>
            <label className="block font-medium mb-1">Possession</label>
            <select
              name="possession"
              value={formData.possession}
              onChange={handleChange}
              required
              className="input-class w-full"
            >
              <option value="">Select Possession</option>
              <option value="ready">Ready to Move</option>
              <option value="1_year">In 1 Year</option>
              <option value="2_years">In 2 Years</option>
              <option value="3_years">In 3 Years</option>
              <option value="after_3_years">After 3 Years</option>
            </select>
          </div>

          {/* Features Multi-Select Dropdown */}
          <div className="relative">
  <label className="block font-medium mb-1">Features</label>
  <div className="input-class w-full cursor-pointer bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center"
    onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
  >
    {formData.features.length > 0 ? formData.features.join(", ") : "Select Features"}
    <span className="ml-2">&#9662;</span>
  </div>

  {showFeaturesDropdown && (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
      {[
  "Barbeque Area",
  "CCTV Security",
  "Jogging Track",
  "Kid's Area",
  "Parking",
  "Senior Citizen Zone",
  "Swimming Pool",
  "Garden",
  "24/7 Security",
  "Power Backup",
  "Clubhouse",
  "Lift"
].map((feature) => (
        <label key={feature} className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer">
          <input
            type="checkbox"
            value={feature}
            checked={formData.features.includes(feature)}
            onChange={(e) => {
              const selectedFeatures = e.target.checked
                ? [...formData.features, feature]
                : formData.features.filter((item) => item !== feature);
              setFormData((prevData) => ({ ...prevData, features: selectedFeatures }));
            }}
          />
          {feature}
        </label>
      ))}
    </div>
  )}
</div>

        </div>

        <div className="flex-center pt-4 gap-4">
          <label className="block font-medium mb-1">Recommend to User</label>
          <input type="checkbox" name="recommend" checked={formData.recommend} onChange={() => setFormData({ ...formData, recommend: !formData.recommend })} />
        </div>

        <button type="submit" className="btn-class w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </section>
  );
};

export default EditProperty;
